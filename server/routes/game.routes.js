const { addNewGame, getAllGames, removeGame } = require('../controllers/game.controller');

module.exports = app => {
  app.post('/api/game', addNewGame)
  app.get('/api/game', getAllGames)
  app.delete('/api/game/:id', removeGame)
}