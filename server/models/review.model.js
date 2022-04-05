const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  review:{
    type: String,
    required: [true, "Please write your review before submitting"],
    minlength: [10, "Review must be atleast 10 characters long to submit"]
  },
  score: {
    type: String,
    required: true
  },
  user: {
    type: String
  },
  game: {
    type: String,
    required: [true, "Please select a game to review"]
  },
  userName: {
    type: String
  }, 
  gameName: { 
    type: String
  }
},
  { timestamps: true })

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;