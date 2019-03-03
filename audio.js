var player = require('play-sound')(opts = {})

module.exports.play = (file) => {
    player.play(file, function(err){
        if (err) throw err
      })
}