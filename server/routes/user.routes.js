const { registerUser, login } = require('../controllers/User.controller');

module.exports = app => {
  app.post('/api/register', registerUser)
  app.post('/api/login', login)
}