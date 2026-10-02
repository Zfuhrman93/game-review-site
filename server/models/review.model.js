const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  review:{
    type: String,
    required: [true, "Please write your review before submitting"],
    minlength: [10, "Review must be atleast 10 characters long to submit"],
    maxlength: [2000, "Review can be at most 2000 characters long"]
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
    type: String,
    required: [true]
  }
},
  { timestamps: true })

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;