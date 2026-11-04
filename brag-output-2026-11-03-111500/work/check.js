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
  const tl=JSON.parse((await ev('JSON.stringify({total:TL.total,frames:TL.frames,fps:TL.fps})')).value);
  console.log('timeline:', JSON.stringify(tl));

  // dense sweep in chunks so no single evaluate exceeds the CDP timeout
  const allErrs=[];
  for(let c=0;c<10;c++){
    const r=await ev(`(function(){const errs=[];const a=${(c*9).toFixed(2)},b=${((c+1)*9).toFixed(2)};
      for(let t=a;t<b&&t<=TL.total+0.05;t+=0.1){try{window.seek(+t.toFixed(3))}catch(e){if(errs.length<8)errs.push(t.toFixed(1)+': '+e.message)}}
      return JSON.stringify(errs)})()`);
    allErrs.push(...JSON.parse(r.value));
  }
  console.log('sweep errors:', JSON.stringify(allErrs));

  // sanity: elements visible at key beats
  const probe=await ev(`(function(){
    function vis(id){const e=document.getElementById(id);return e&&e.style.visibility!=='hidden'&&+e.style.opacity>0.05}
    const out={};
    const beats={ '1.0':['awTag'], '3.0':['awA'], '6.0':['awB'],
      '10.4':['wThink'], '11.8':['wCreate'], '13.2':['wInno'],
      '15.0':['tl1'], '16.2':['tl2'], '18.0':['tl3'], '19.9':['code2'],
      '27.0':['emb3','word3'], '29.0':['tag3'], '31.0':['s3t'],
      '34.0':['chap4','sub4','fr4'], '40.0':['chap4','sub4','fr4'],
      '53.0':['chap4','sub4','ph4a','ph4b','ph4c'], '57.0':['chap4','ph4a'],
      '59.6':['shloka5'], '62.5':['s5a'], '65.5':['s5b'], '68.5':['net5'],
      '71.5':['m6a','m6b','m6c','m6d','m6e','m6f'],
      '74.8':['st6a'], '77.0':['st6b'], '79.8':['emb6','word6'],
      '82.8':['ln6'], '85.0':['url6'], '87.0':['ln6b'] };
    for(const k in beats){window.seek(+k);
      const miss=beats[k].filter(id=>!vis(id));
      if(miss.length) out[k]=miss;}
    return JSON.stringify(out,null,0)})()`);
  console.log('probe (missing only):', probe.value);
  chrome.kill(); process.exit(0);
})().catch(e=>{console.error('CHECK FAILED:',e.message);process.exit(1)});
