const { addNewReview, getAllReviews, findByGame, updateReview, deleteReview } = require('../controllers/review.controller');

module.exports = app => {
  app.post('/api/review', addNewReview);
  app.get('/api/review', getAllReviews);
  app.get('/api/review/:id', findByGame);
  app.put('/api/review/:id', updateReview);
  app.delete('/api/review/:id', deleteReview);
}