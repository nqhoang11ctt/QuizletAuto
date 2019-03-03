var player = require('play-sound')(opts = {})

module.exports.play = () => {
    player.play('audio.mp3', function(err){
        if (err) throw err
      })
}