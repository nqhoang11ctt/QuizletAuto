const req = require('request');
const chr = require('cheerio');
const fs = require('fs');
const audio = require(__dirname + '/audio.js');

module.exports = async (text) => {
    return new Promise((resolve, reject)=>{
        req.post({
            url: "https://ailab.hcmus.edu.vn/vos/demo.php",
            form: {
                text: text,
                voice: "kp", // Southern Vietnamese
                speed: 1
            }
        }, (err, resp, body) => {
            if (err) {
                reject(new Error(err));
            } else if (resp.statusCode === 200) {
                const $ = chr.load(body);
                const audioSrc = `https://ailab.hcmus.edu.vn/vos/${$('source').attr('src')}`;
                req.get(audioSrc).pipe(fs.createWriteStream('audio.mp3').on('close', ()=>{
                    resolve(audio.play('audio.mp3'));
                }));
            } else reject(new Error(resp.statusCode));
        });
    })
}