const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Game must have a name to be added to the site."]
  },
  systems: {
    type: [String]
  },
  gameCover: {
    type: String
  },
  topPick: {
    type: Boolean,
    default: false
  }
})

const Game = mongoose.model('Game', GameSchema);

module.exports = Game;