const { addNewReview, getAllReviews } = require('../controllers/review.controller');

module.exports = app => {
  app.post('/api/review', addNewReview);
  app.get('/api/review', getAllReviews);
}