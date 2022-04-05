const { addNewGame, getAllGames, getGameById, removeGame, updateGame, getGamesByTop } = require('../controllers/game.controller');

module.exports = app => {
  app.post('/api/game', addNewGame)
  app.get('/api/game/:id', getGameById)
  app.get('/api/game', getAllGames)
  app.get('/api/top/games', getGamesByTop)
  app.put('/api/game/:id', updateGame)
  app.delete('/api/game/:id', removeGame)
}