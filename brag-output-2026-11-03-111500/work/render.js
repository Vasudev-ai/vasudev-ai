#!/usr/bin/env node
/* Deterministic frame renderer: Chrome (CDP) → ffmpeg pipe.
   Resilient: if the CDP session dies mid-render it is rebuilt and the
   frame retried, so a 45-minute render never loses its place.

   node render.js stills 0.5,4,12,29,45,60,75,86
   node render.js video                                             */
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9401;
const ROOT = __dirname;
const PAGE_URL = 'file:///' + path.join(ROOT, 'composition', 'index.html').replace(/\\/g, '/');
const MODE = process.argv[2] || 'video';
const CALL_TIMEOUT = 45000;

function log(...a) { console.log(new Date().toISOString().slice(11, 19), ...a); }

function get(url) {
  return new Promise((res, rej) => {
    const req = http.get(url, r => {
      let d = ''; r.on('data', c => d += c); r.on('end', () => { try { res(JSON.parse(d)); } catch (e) { rej(e); } });
    });
    req.on('error', rej);
    setTimeout(() => { try { req.destroy(new Error('list timeout')); } catch (e) {} }, 2000);
  });
}
const sleep = ms => new Promise(r => setTimeout(r, ms));

/* ------------------------------------------------------------------ session */
async function startSession() {
  const profile = path.join(ROOT, 'chrome-profile');
  fs.rmSync(profile, { recursive: true, force: true });
  const chrome = spawn(CHROME, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
    '--no-default-browser-check', '--disable-extensions', '--disable-background-networking',
    '--disable-sync', '--disable-features=CalculateNativeWinOcclusion,Translate',
    '--js-flags=--max-old-space-size=384', '--renderer-process-limit=2',
    '--force-color-profile=srgb', '--force-device-scale-factor=1',
    '--window-size=1920,1080', '--mute-audio',
    '--remote-debugging-port=' + PORT, '--user-data-dir=' + profile,
    'about:blank'
  ], { stdio: 'ignore' });
  let dead = false;
  chrome.on('exit', c => { dead = true; log('chrome exited with', c); });

  let page = null;
  for (let i = 0; i < 80 && !page; i++) {
    try {
      const list = await get(`http://127.0.0.1:${PORT}/json/list`);
      page = list.find(t => t.type === 'page');
      if (page && !page.webSocketDebuggerUrl) page = null;
    } catch (e) { /* not up yet */ }
    if (!page) await sleep(250);
  }
  if (!page) { try { chrome.kill(); } catch (e) {} throw new Error('Chrome DevTools never came up'); }

  const cdp = await connect(page.webSocketDebuggerUrl);
  const session = {
    chrome, cdp, dead: () => dead,
    async call(method, params = {}) {
      if (dead) throw new Error('chrome is dead');
      return cdp.send(method, params);
    },
    async close() {
      try { cdp.close(); } catch (e) {}
      try { chrome.kill(); } catch (e) {}
    }
  };

  await session.call('Emulation.setDeviceMetricsOverride',
    { width: 1920, height: 1080, deviceScaleFactor: 1, mobile: false, screenWidth: 1920, screenHeight: 1080 });
  await session.call('Page.enable');
  await session.call('Runtime.enable');
  await session.call('Page.navigate', { url: PAGE_URL });

  let ready = false;
  for (let i = 0; i < 200; i++) {
    const r = await session.call('Runtime.evaluate',
      { expression: 'window.__ready === true', returnByValue: true });
    if (r.result && r.result.value) { ready = true; break; }
    await sleep(250);
  }
  if (!ready) { await session.close(); throw new Error('composition never signalled ready'); }
  return session;
}

function connect(url) {
  return new Promise((res, rej) => {
    const ws = new WebSocket(url);
    const pending = new Map();
    let seq = 0, broken = false;
    ws.onopen = () => res({
      send(method, params = {}) {
        return new Promise((r, j) => {
          if (broken) return j(new Error('socket closed'));
          const id = ++seq;
          pending.set(id, { r, j });
          try { ws.send(JSON.stringify({ id, method, params })); }
          catch (e) { pending.delete(id); return j(e); }
          setTimeout(() => {
            if (pending.has(id)) { pending.delete(id); j(new Error('CDP timeout: ' + method)); }
          }, CALL_TIMEOUT);
        });
      },
      close() { try { ws.close(); } catch (e) {} }
    });
    ws.onerror = () => { broken = true; };
    ws.onclose = () => { broken = true; for (const p of pending.values()) p.j(new Error('socket closed')); pending.clear(); };
    ws.onmessage = ev => {
      const m = JSON.parse(ev.data);
      if (m.id && pending.has(m.id)) {
        const p = pending.get(m.id); pending.delete(m.id);
        if (m.error) p.j(new Error(m.error.message)); else p.r(m.result);
      }
    };
  });
}

/* ------------------------------------------------------------------ main */
let session = null;
async function getSession() {
  if (session) {
    try { await session.call('Runtime.evaluate', { expression: '1', returnByValue: true }); return session; }
    catch (e) { log('session stale →', e.message); await killSession(); }
  }
  session = await startSession();
  log('session ready');
  return session;
}
async function killSession() { if (session) { try { await session.close(); } catch (e) {} session = null; } }

async function withRetry(what, fn, attempts = 3) {
  let lastErr;
  for (let a = 0; a < attempts; a++) {
    try { const s = await getSession(); return await fn(s); }
    catch (e) {
      lastErr = e;
      log(`  ${what} failed (attempt ${a + 1}/${attempts}): ${e.message}`);
      await killSession();
      if (a < attempts - 1) await sleep(800);
    }
  }
  throw lastErr;
}

async function main() {
  const t0 = Date.now();

  if (MODE === 'stills') {
    const s = await getSession();
    const times = (process.argv[3] || '0,4,12,20,29,34,45,50,58,63,70,78,84,88').split(',').map(Number);
    const dir = path.join(ROOT, 'stills');
    fs.mkdirSync(dir, { recursive: true });
    for (const t of times) {
      const buf = await withRetry('still ' + t, async ses => {
        await ses.call('Runtime.evaluate', { expression: `window.seek(${t.toFixed(5)})`, returnByValue: true });
        const sh = await ses.call('Page.captureScreenshot', {
          format: 'png', captureBeyondViewport: false,
          clip: { x: 0, y: 0, width: 1920, height: 1080, scale: 1 }
        });
        return Buffer.from(sh.data, 'base64');
      });
      fs.writeFileSync(path.join(dir, `t_${t.toFixed(2).padStart(6, '0')}.png`), buf);
      log('  still', t);
    }
    await killSession();
    return;
  }

  /* ------------------------- full render ------------------------- */
  let s = await getSession();
  const TLr = await s.call('Runtime.evaluate',
    { expression: 'JSON.stringify({total:TL.total,frames:TL.frames,fps:TL.fps})', returnByValue: true });
  const TL = JSON.parse(TLr.result.value);
  log(`timeline: ${TL.frames} frames @ ${TL.fps}fps  (${TL.total}s)`);

  const outPath = path.join(ROOT, '..', 'brag_raw.mp4');
  const audioPath = path.join(ROOT, 'music_norm.wav');
  const ff = spawn('ffmpeg', ['-y', '-v', 'warning', '-stats',
    '-f', 'image2pipe', '-framerate', String(TL.fps), '-i', '-',
    '-i', audioPath,
    '-map', '0:v:0', '-map', '1:a:0',
    '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '14',
    // this box is commit-starved (20 cores, <1 GB free virtual): hard-cap
    // x264 to one sliced thread so the encoder never needs big frame buffers
    '-threads', '1', '-x264-params', 'sliced-threads=1',
    '-max_muxing_queue_size', '64',
    '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-level', '4.2',
    '-c:a', 'aac', '-b:a', '192k', '-ar', '44100',
    '-shortest', '-movflags', '+faststart', outPath], { stdio: ['pipe', 'ignore', 'pipe'] });

  let ffErr = '';
  ff.stderr.on('data', d => { ffErr += d; });
  ff.stdin.on('error', e => {
    log('ffmpeg stdin closed:', e.message);
    log('ffmpeg stderr tail:\n' + ffErr.slice(-2500));
  });
  const ffDone = new Promise((res, rej) => {
    ff.on('close', c => c === 0 ? res() : rej(new Error('ffmpeg exit ' + c + '\n' + ffErr.slice(-3000))));
    ff.on('error', rej);
  });
  const writeFrame = buf => new Promise((res, rej) => {
    if (ff.stdin.write(buf)) res(); else ff.stdin.once('drain', res);
    setTimeout(() => rej(new Error('ffmpeg stdin stall')), 30000);
  });

  const frames = TL.frames;
  for (let i = 0; i < frames; i++) {
    const buf = await withRetry(`frame ${i}`, async ses => {
      await ses.call('Runtime.evaluate',
        { expression: `window.seek(${(i / TL.fps).toFixed(5)})`, returnByValue: true });
      // JPEG at high quality: ~4x less data over the wire than PNG, and
      // luminance (where all the type lives) stays full resolution.
      const sh = await ses.call('Page.captureScreenshot', {
        format: 'jpeg', quality: 97, captureBeyondViewport: false,
        clip: { x: 0, y: 0, width: 1920, height: 1080, scale: 1 }
      });
      return Buffer.from(sh.data, 'base64');
    });
    await writeFrame(buf);
    if (i % 150 === 0 || i === frames - 1) {
      const el = (Date.now() - t0) / 1000;
      const rate = (i + 1) / el;
      log(`  frame ${i + 1}/${frames}  ${((i + 1) / frames * 100).toFixed(0)}%  ` +
          `${el.toFixed(0)}s elapsed  eta ${((frames - i - 1) / rate / 60).toFixed(1)} min`);
    }
  }
  ff.stdin.end();
  await ffDone;
  log('ffmpeg done →', outPath, `${((Date.now() - t0) / 60000).toFixed(1)} min total`);
  await killSession();
}

main().then(() => process.exit(0))
      .catch(async e => { console.error('RENDER FAILED:', e.message); await killSession(); process.exit(1); });
