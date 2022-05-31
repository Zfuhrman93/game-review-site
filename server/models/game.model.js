const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Game must have a name to be added to the site."]
  },
  xbox: {
    type: Boolean
  },
  PS4: {
    type: Boolean
  },
  nSwitch: {
    type: Boolean
  },
  PC: {
    type: Boolean
  },
  gameCover: {
    type: String
  }
})

const Game = mongoose.model('Game', GameSchema);

module.exports = Game;