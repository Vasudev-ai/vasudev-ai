/* Sweep window.seek across the whole timeline and report any thrown error,
   plus verify __ready and the timeline shape. */
const { spawn } = require('child_process');
const fs = require('fs'), path = require('path'), http = require('http');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9407, ROOT = __dirname;
const PAGE_URL = 'file:///' + path.join(ROOT, 'composition', 'index.html').replace(/\\/g, '/');
const sleep = ms => new Promise(r => setTimeout(r, ms));
function get(url){return new Promise((res,rej)=>{const q=http.get(url,r=>{let d='';r.on('data',c=>d+=c);r.on('end',()=>{try{res(JSON.parse(d))}catch(e){rej(e)}})});q.on('error',rej);setTimeout(()=>{try{q.destroy(new Error('t'))}catch(e){}},2000)})}
function connect(url){return new Promise((res,rej)=>{const ws=new WebSocket(url);const p=new Map();let s=0;
  ws.onopen=()=>res({send:(m,pr={})=>new Promise((r,j)=>{const id=++s;p.set(id,{r,j});try{ws.send(JSON.stringify({id,method:m,params:pr}))}catch(e){p.delete(id);j(e)}
    setTimeout(()=>{if(p.has(id)){p.delete(id);j(new Error('timeout '+m))}},30000)}),
    close:()=>{try{ws.close()}catch(e){}}});
  ws.onerror=()=>rej(new Error('ws error'));
  ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id&&p.has(m.id)){const q=p.get(m.id);p.delete(m.id);m.error?q.j(new Error(m.error.message)):q.r(m.result)}}})}

(async () => {
  const profile = path.join(ROOT, 'chrome-profile-check');
  fs.rmSync(profile, { recursive: true, force: true });
  const chrome = spawn(CHROME, ['--headless=new','--disable-gpu','--hide-scrollbars','--no-first-run',
    '--no-default-browser-check','--disable-extensions','--disable-background-networking','--disable-sync',
    '--force-color-profile=srgb','--force-device-scale-factor=1','--window-size=1920,1080','--mute-audio',
    '--remote-debugging-port='+PORT,'--user-data-dir='+profile,'about:blank'], {stdio:'ignore'});
  let page=null;
  for(let i=0;i<80&&!page;i++){try{const l=await get(`http://127.0.0.1:${PORT}/json/list`);page=l.find(t=>t.type==='page');if(page&&!page.webSocketDebuggerUrl)page=null}catch(e){}
    if(!page)await sleep(250)}
  if(!page){chrome.kill();throw new Error('no page')}
  const ses=await connect(page.webSocketDebuggerUrl);
  const ev=async expr=>(await ses.send('Runtime.evaluate',{expression:expr,returnByValue:true})).result;
  const errs=[];
  await ses.send('Runtime.enable');
  await ses.send('Runtime.evaluate',{expression:`window.__errs=[];window.addEventListener('error',e=>window.__errs.push(String(e.message)))`});
  await ses.send('Page.navigate',{url:PAGE_URL});
  let ready=false;
  for(let i=0;i<200;i++){const r=await ev('window.__ready===true');if(r.value){ready=true;break}await sleep(250)}
  console.log('ready:', ready);
  const tl=JSON.parse((await ev('JSON.stringify({total:TL.total,frames:TL.frames,fps:TL.fps,n:TL.lines.length})')).value);
  console.log('timeline:', JSON.stringify(tl));

  // dense sweep in chunks so no single evaluate exceeds the CDP timeout
  const allErrs=[];
  for(let c=0;c<10;c++){
    const r=await ev(`(function(){const errs=[];const a=${(c*8.5).toFixed(2)},b=${((c+1)*8.5).toFixed(2)};
      for(let t=a;t<b&&t<=TL.total+0.05;t+=0.1){try{window.seek(+t.toFixed(3))}catch(e){if(errs.length<8)errs.push(t.toFixed(1)+': '+e.message)}}
      return JSON.stringify(errs)})()`);
    allErrs.push(...JSON.parse(r.value));
  }
  console.log('sweep errors:', JSON.stringify(allErrs));

  // sanity: elements visible at key beats
  const probe=await ev(`(function(){
    function vis(id){const e=document.getElementById(id);return e&&e.style.visibility!=='hidden'&&+e.style.opacity>0.05}
    const out={};
    const beats={ '0.6':['s1a'], '8.5':['shot1','s2t'], '14.0':['code1','s2t'],
      '17.5':['emb3','word3'], '19.0':['emb3','word3','aw3'],
      '21.0':['s4t'], '28.5':['c4a','c4b','c4c','c4d','s4t'], '33.5':['w0','w1','w2','w3'],
      '36.2':['one4'], '38.2':['shloka5'], '41.7':['shloka5','s5t'],
      '45.6':['m6a','s6t'], '48.6':['m6c','s6t'], '52.6':['m6d','s6b'],
      '57.5':['emb7','word7','aw7'], '64.0':['emb7','word7','ln1_7','ln2_7','url7'] };
    for(const k in beats){window.seek(+k);out[k]=beats[k].filter(id=>!vis(id)).map(id=>id+' MISSING')||[]}
    return JSON.stringify(out,null,0)})()`);
  console.log('probe:', probe.value);
  chrome.kill(); process.exit(0);
})().catch(e=>{console.error('CHECK FAILED:',e.message);process.exit(1)});
