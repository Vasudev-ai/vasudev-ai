const https = require('https');

https.get('https://30-hour-learn-build-sprint.vercel.app/', (res) => {
    console.log('X-Frame-Options:', res.headers['x-frame-options']);
    console.log('Content-Security-Policy:', res.headers['content-security-policy']);
}).on('error', (e) => {
    console.error(e);
});
