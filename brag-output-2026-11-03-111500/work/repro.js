/* Reproduce the ffmpeg pipe exactly like render.js does, but capture stderr. */
const { spawn } = require('child_process');
const fs = require('fs'), path = require('path');
const WORK = __dirname;
const audioPath = path.join(WORK, 'music_norm.wav');
const outPath = path.join(WORK, '..', 'test_raw.mp4');
const frames = ['stills/t_003.00.png','stills/t_015.00.png','stills/t_033.00.png']
  .map(f => fs.readFileSync(path.join(WORK, f)));

const ff = spawn('ffmpeg', ['-y','-v','warning','-stats',
  '-f','image2pipe','-framerate','30','-i','-',
  '-i',audioPath,
  '-map','0:v:0','-map','1:a:0',
  '-c:v','libx264','-preset','medium','-crf','17',
  '-pix_fmt','yuv420p','-profile:v','high','-level','4.2',
  '-c:a','aac','-b:a','192k','-ar','44100',
  '-shortest','-movflags','+faststart',outPath], {stdio:['pipe','ignore','pipe']});

let err='';
ff.stderr.on('data',d=>{err+=d;});
ff.stdin.on('error',e=>{console.log('STDIN ERROR:',e.message);});
ff.on('close',c=>{console.log('ffmpeg exit',c);console.log('--- stderr ---\n'+err.slice(-4000));
  try{console.log('out size',fs.statSync(outPath).size)}catch(e){console.log('no out')}});

(async()=>{
  for(const b of frames){
    await new Promise(r=>{ if(ff.stdin.write(b)) r(); else ff.stdin.once('drain',r); });
  }
  ff.stdin.end();
})();
