// Measure exactly which character widths differ from expectation.
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9335;
const PAGE = 'file:///' + path.resolve(__dirname, 'composition', 'index.html').replace(/\\/g, '/');
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const chrome = spawn(CHROME, [
    '--headless=new', `--remote-debugging-port=${PORT}`,
    '--user-data-dir=' + path.join(__dirname, 'chrome-probe2'),
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

  const expr = `(() => {
    (window.seek || seek)(90.0);
    const el = document.getElementById('meta8');
    const cs = getComputedStyle(el);

    // 1) width of the real text via Range
    const range = document.createRange();
    range.selectNodeContents(el);
    const realW = range.getBoundingClientRect().width;

    // 2) clone with explicit test strings, measure each
    const probe = (txt) => {
      const d = document.createElement('div');
      d.style.cssText = 'position:absolute;left:-9999px;top:0;white-space:pre;' +
        'font-family:' + cs.fontFamily + ';font-size:' + cs.fontSize +
        ';font-weight:' + cs.fontWeight + ';letter-spacing:' + cs.letterSpacing +
        ';font-style:' + cs.fontStyle;
      d.textContent = txt;
      document.body.appendChild(d);
      const w = d.getBoundingClientRect().width;
      d.remove();
      return w;
    };

    // 3) per-character advance via canvas, char by char
    const c = document.createElement('canvas').getContext('2d');
    c.font = cs.fontStyle + ' ' + cs.fontWeight + ' ' + cs.fontSize + ' ' + cs.fontFamily;
    if ('letterSpacing' in c) c.letterSpacing = cs.letterSpacing;
    const chars = [];
    const s = el.textContent;
    for (let i = 0; i < s.length; i++) {
      chars.push({ ch: JSON.stringify(s[i]), code: s.charCodeAt(i),
                   adv: +c.measureText(s[i]).width.toFixed(2) });
    }

    return JSON.stringify({
      textCodes: Array.from(s).map(ch => ch.charCodeAt(0)),
      realW: +realW.toFixed(2),
      probeWithSpace: +probe('Building Intelligence.').toFixed(2),
      probeNoSpace:   +probe('Building.Intelligence.').toFixed(2),
      probeSpaceOnly: +probe(' ').toFixed(2),
      probeDouble:    +probe('  ').toFixed(2),
      probeNBSP:      +probe('\\u00a0').toFixed(2),
      probeMid:       +probe('AA AA').toFixed(2),
      probeMidDot:    +probe('A. A').toFixed(2),
      canvasSpace:    +c.measureText(' ').width.toFixed(2),
      canvasFull:     +c.measureText(s).width.toFixed(2),
      hasLetterSpacing: 'letterSpacing' in c,
      letterSpacingVal: ('letterSpacing' in c) ? c.letterSpacing : null,
      chars,
    }, null, 1);
  })()`;

  const out = await send('Runtime.evaluate', { expression: expr, returnByValue: true });
  const v = out.result && out.result.result && out.result.result.value;
  console.log(typeof v === 'string' ? v : JSON.stringify(v, null, 1));

  ws.close(); chrome.kill();
}
main().catch(e => { console.error(e); process.exit(1); });
