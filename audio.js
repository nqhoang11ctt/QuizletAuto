var player = require('play-sound')(opts = {})

module.exports.play = async (file) => {
  return new Promise((resolve, reject)=>{
    player.play(file, function(err){
      if (err) reject(new Error(err));
      else {
        resolve(true);
      }
    })
  })
}