const Review = require('../models/review.model');
const User = require('../models/user.model');

const addNewReview = async (req, res) => {
  try{
    const author = await User.findById(req.userId);
    const newReview = await Review.create({
      ...req.body,
      user: req.userId,
      userName: author.name,
    });
    res.json(newReview);
  }catch(err){
    console.log('Error!');
    res.status(400).json(err);
  }
}

const requireReviewOwnerOrAdmin = async (req, res, next) => {
  try{
    const review = await Review.findById(req.params.id);
    if(!review){
      return res.status(404).json({ error: "Review not found" });
    }
    if(review.user === req.userId){
      return next();
    }
    const user = await User.findById(req.userId);
    if(user && user.admin){
      return next();
    }
    return res.status(403).json({ error: "Not allowed to modify this review" });
  }catch(err){
    return res.status(400).json(err);
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

const getReview = async (req, res) => {
  try{
    const oneReview = await Review.find({ _id: req.params.id })
    res.json(oneReview)
  }catch(err){
    console.log(err);
  }
}

const findByGame = async (req, res) => {
  try{
    const gameReviews = await Review.find({ game: req.params.id })
    res.json(gameReviews)
  }catch(err){
    console.log('Error!');
    res.status(400).json(err);
  }
}

const recentReviews = async (req, res) => {
  try{
    const recents = await Review.find().sort({_id: -1}).limit(5)
    res.json(recents)
  }catch(err){
    console.log('Error!');
    res.status(400).json(err);
  }
}

const updateReview = async (req, res) => {
  try{
    const updatedReview = await Review.findOneAndUpdate({ _id: req.params.id },
      req.body,
      { returnDocument: 'after', runValidators:true })
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
  getReview,
  recentReviews,
  findByGame,
  updateReview,
  deleteReview,
  requireReviewOwnerOrAdmin,
}
