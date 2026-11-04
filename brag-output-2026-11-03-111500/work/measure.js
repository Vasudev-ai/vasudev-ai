/* Measure element boxes at given times: id -> {x,y,w,h,op,vis} */
const { spawn } = require('child_process');
const fs = require('fs'), path = require('path'), http = require('http');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9409, ROOT = __dirname;
const PAGE_URL = 'file:///' + path.join(ROOT, 'composition', 'index.html').replace(/\\/g, '/');
const sleep = ms => new Promise(r => setTimeout(r, ms));
function get(url){return new Promise((res,rej)=>{const q=http.get(url,r=>{let d='';r.on('data',c=>d+=c);r.on('end',()=>{try{res(JSON.parse(d))}catch(e){rej(e)}})});q.on('error',rej);setTimeout(()=>{try{q.destroy(new Error('t'))}catch(e){}},2000)})}
function connect(url){return new Promise((res,rej)=>{const ws=new WebSocket(url);const p=new Map();let s=0;
  ws.onopen=()=>res({send:(m,pr={})=>new Promise((r,j)=>{const id=++s;p.set(id,{r,j});try{ws.send(JSON.stringify({id,method:m,params:pr}))}catch(e){p.delete(id);j(e)}
    setTimeout(()=>{if(p.has(id)){p.delete(id);j(new Error('timeout '+m))}},30000)}),close:()=>{try{ws.close()}catch(e){}}});
  ws.onerror=()=>rej(new Error('ws'));ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id&&p.has(m.id)){const q=p.get(m.id);p.delete(m.id);m.error?q.j(new Error(m.error.message)):q.r(m.result)}}})}

(async()=>{
  const profile=path.join(ROOT,'chrome-profile-meas');
  fs.rmSync(profile,{recursive:true,force:true});
  const chrome=spawn(CHROME,['--headless=new','--disable-gpu','--hide-scrollbars','--no-first-run',
    '--no-default-browser-check','--disable-extensions','--force-color-profile=srgb',
    '--force-device-scale-factor=1','--window-size=1920,1080','--mute-audio',
    '--remote-debugging-port='+PORT,'--user-data-dir='+profile,'about:blank'],{stdio:'ignore'});
  let page=null;
  for(let i=0;i<80&&!page;i++){try{const l=await get(`http://127.0.0.1:${PORT}/json/list`);page=l.find(t=>t.type==='page');if(page&&!page.webSocketDebuggerUrl)page=null}catch(e){}
    if(!page)await sleep(250)}
  const ses=await connect(page.webSocketDebuggerUrl);
  const ev=async e=>(await ses.send('Runtime.evaluate',{expression:e,returnByValue:true})).result;
  await ses.send('Page.navigate',{url:PAGE_URL});
  for(let i=0;i<200;i++){const r=await ev('window.__ready===true');if(r.value)break;await sleep(250)}
  const spec=JSON.parse(fs.readFileSync(path.join(ROOT,'spec.json'),'utf8'));
  for(const [t,ids] of Object.entries(spec)){
    const r=await ev(`(function(){window.seek(${+t});const o={};
      for(const id of ${JSON.stringify(ids)}){const e=document.getElementById(id);if(!e){o[id]='NO ELEMENT';continue}
        const b=e.getBoundingClientRect();
        o[id]={x:Math.round(b.x),y:Math.round(b.y),w:Math.round(b.width),h:Math.round(b.height),
               op:e.style.opacity,vis:e.style.visibility}}
      return JSON.stringify(o)})()`);
    console.log('t='+t, r.value);
  }
  chrome.kill();process.exit(0);
})().catch(e=>{console.error('MEAS FAILED:',e.message);process.exit(1)});
