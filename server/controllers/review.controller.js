const Review = require('../models/review.model');

const addNewReview = async (req, res) => {
  try{
    const newReview = await Review.create(req.body);
    res.json(newReview);
  }catch(err){
    console.log('Error!');
    res.status(400).json(err);
  }
}

const getAllReviews = async (req, res) => {
  try{
    const allReviews = await Review.find()
    res.json(allReviews);
  }catch(err){
    console.log('Error!');
    res.status(400).json(err);
  }
}

const updateReview = async (req, res) => {
  try{
    const updatedReview = await Review.findOneAndUpdate({ _id: req.params.id })
    res.json(updatedReview);
  }catch(err){
    console.log('Error!');
    res.status(400).json(err);
  }
}

const deleteReview = async (req, res) => {
  try{
    const deletedReview = await Review.deleteOne({ _id: req.params.id })
    res.json(deletedReview);
  }catch(err){
    console.log('Error!');
    res.status(400).json(err);
  }
}

module.exports = {
  addNewReview,
  getAllReviews,
  updateReview,
  deleteReview
}

/* try{

}catch(err){
  console.log('Error!');
  res.status(400).json(err);
} */