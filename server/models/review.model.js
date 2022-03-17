const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  review:{
    type: String,
    required: true
  },
  score: {
    type: String,
    required: true
  },
  user: {
    type: String
  },
  game: {
    type: String
  }
})

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;