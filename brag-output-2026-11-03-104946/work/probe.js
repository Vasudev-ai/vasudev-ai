// Probe the composition DOM: what does meta8 actually contain/render as?
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9334;
const PAGE = 'file:///' + path.resolve(__dirname, 'composition', 'index.html').replace(/\\/g, '/');

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const chrome = spawn(CHROME, [
    '--headless=new', `--remote-debugging-port=${PORT}`,
    '--user-data-dir=' + path.join(__dirname, 'chrome-probe'),
    '--no-first-run', '--disable-gpu', '--window-size=1920,1080',
    'about:blank',
  ], { stdio: 'ignore' });

  let target;
  for (let i = 0; i < 60; i++) {
    await sleep(400);
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/list`);
      const list = await r.json();
      target = list.find(t => t.type === 'page');
      if (target) break;
    } catch (e) { /* retry */ }
  }
  if (!target) { console.log('no target'); chrome.kill(); return; }

  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  let id = 0;
  const pending = new Map();
  const events = [];
  ws.onmessage = ev => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
    else if (m.method) events.push(m);
  };
  const send = (method, params = {}) => new Promise(res => {
    const i = ++id;
    pending.set(i, res);
    ws.send(JSON.stringify({ id: i, method, params }));
  });

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride',
    { width: 1920, height: 1080, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: PAGE });
  await sleep(2500);

  const expr = `(() => {
    if (typeof seek !== 'function' && typeof window.seek !== 'function') return 'NO SEEK FN';
    (window.seek || seek)(90.0);
    const el = document.getElementById('meta8');
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return JSON.stringify({
      text: el.textContent,
      html: el.innerHTML,
      rect: { x: r.x, y: r.y, w: r.width, h: r.height },
      font: cs.fontFamily,
      letterSpacing: cs.letterSpacing,
      wordSpacing: cs.wordSpacing,
      whiteSpace: cs.whiteSpace,
      fontSize: cs.fontSize,
      visibility: cs.visibility,
      opacity: cs.opacity,
      loadedFonts: Array.from(document.fonts).map(f => f.family + ':' + f.status).slice(0, 20),
      interLoaded: document.fonts.check('26px Inter'),
      measure: (() => {
        const c = document.createElement('canvas').getContext('2d');
        c.font = cs.fontStyle + ' ' + cs.fontWeight + ' ' + cs.fontSize + ' ' + cs.fontFamily;
        return { full: c.measureText(el.textContent).width,
                 nospace: c.measureText('Building.Intelligence. Empowering Innovation.').width };
      })(),
    });
  })()`;

  const out = await send('Runtime.evaluate', { expression: expr, returnByValue: true });
  console.log(JSON.stringify(out.result && out.result.result && out.result.result.value, null, 2));

  const errs = events.filter(e => e.method === 'Runtime.exceptionThrown' ||
    (e.method === 'Runtime.consoleAPICalled' && e.params.type === 'error'));
  console.log('page errors:', errs.length);
  for (const e of errs.slice(0, 5)) console.log(JSON.stringify(e.params).slice(0, 400));

  // Screenshot the meta element region for visual confirmation
  const shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(__dirname, 'probe_full.png'), Buffer.from(shot.result.data, 'base64'));

  ws.close();
  chrome.kill();
}
main().catch(e => { console.error(e); process.exit(1); });
