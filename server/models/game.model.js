const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  systems: {
    type: [String]
  }
})

const Game = mongoose.model('Game', GameSchema);

module.exports = Game;