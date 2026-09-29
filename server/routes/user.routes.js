const { registerUser, login, logout, protected, getUser } = require('../controllers/user.controller');
const { loginLimiter, registerLimiter } = require('../middleware/rateLimit.middleware');

module.exports = app => {
  app.post('/api/register', registerLimiter, registerUser)
  app.post('/api/login', loginLimiter, login)
  app.post('/api/logout', logout)
  app.get('/api/protected', protected)
  app.get('/api/user/:id', getUser)
}