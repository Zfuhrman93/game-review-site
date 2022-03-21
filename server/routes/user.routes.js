const { registerUser, login, protected, getUser } = require('../controllers/User.controller');

module.exports = app => {
  app.post('/api/register', registerUser)
  app.post('/api/login', login)
  app.get('/api/protected', protected)
  app.get('/api/user/:id', getUser)
}