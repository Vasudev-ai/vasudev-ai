// Screenshot ONLY #meta8 (everything else hidden), measure ink gaps precisely.
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9336;
const PAGE = 'file:///' + path.resolve(__dirname, 'composition', 'index.html').replace(/\\/g, '/');
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const chrome = spawn(CHROME, [
    '--headless=new', `--remote-debugging-port=${PORT}`,
    '--user-data-dir=' + path.join(__dirname, 'chrome-probe3'),
    '--no-first-run', '--disable-gpu', '--window-size=1920,1080', 'about:blank',
  ], { stdio: 'ignore' });

  let target;
  for (let i = 0; i < 60; i++) {
    await sleep(400);
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/list`);
      const list = await r.json();
      target = list.find(t => t.type === 'page');
      if (target) break;
    } catch (e) {}
  }
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  let id = 0; const pending = new Map();
  ws.onmessage = ev => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
  };
  const send = (method, params = {}) => new Promise(res => {
    const i = ++id; pending.set(i, res);
    ws.send(JSON.stringify({ id: i, method, params }));
  });

  await send('Page.enable'); await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride',
    { width: 1920, height: 1080, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: PAGE });
  await sleep(2500);

  // Hide everything except meta8, paint bg black so light text is clean.
  const setup = `(() => {
    (window.seek || seek)(90.0);
    document.getElementById('bg').style.display = 'none';
    document.querySelectorAll('#ui > *').forEach(s => s.style.display = 'none');
    const ui = document.getElementById('ui');
    ui.style.background = '#000';
    document.body.style.background = '#000';
    const el = document.getElementById('meta8');
    el.style.display = 'block';
    // find its scene and show just that
    const s8 = document.getElementById('s8');
    s8.style.display = 'block';
    s8.querySelectorAll('*').forEach(n => { if (n !== el && !el.contains(n)) n.style.display = 'none'; });
    el.style.opacity = '1';
    el.style.left = '0'; el.style.right = '0'; el.style.top = '0';
    const r = el.getBoundingClientRect();
    return JSON.stringify({ x: r.x, y: r.y, w: r.width, h: r.height,
                            text: el.textContent });
  })()`;
  const st = await send('Runtime.evaluate', { expression: setup, returnByValue: true });
  console.log('setup:', st.result.result.value);

  const shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(__dirname, 'meta_only.png'), Buffer.from(shot.result.data, 'base64'));
  console.log('wrote meta_only.png');

  ws.close(); chrome.kill();
}
main().catch(e => { console.error(e); process.exit(1); });
