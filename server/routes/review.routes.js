const { addNewReview, getAllReviews, recentReviews, getReview, findByGame, updateReview, deleteReview, requireReviewOwnerOrAdmin } = require('../controllers/review.controller');
const { requireAuth } = require('../middleware/auth.middleware');

module.exports = app => {
  app.post('/api/review', requireAuth, addNewReview);
  app.get('/api/review', getAllReviews);
  app.get('/api/review/recent', recentReviews);
  app.get('/api/review/edit/:id', getReview);
  app.get('/api/review/:id', findByGame);
  app.put('/api/review/:id', requireAuth, requireReviewOwnerOrAdmin, updateReview);
  app.delete('/api/review/:id', requireAuth, requireReviewOwnerOrAdmin, deleteReview);
}