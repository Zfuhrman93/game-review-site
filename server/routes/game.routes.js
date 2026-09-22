const { addNewGame, getAllGames, getGameById, removeGame, updateGame, getGamesByTop } = require('../controllers/game.controller');
const { requireAuth, requireAdmin } = require('../middleware/auth.middleware');
const multer = require('multer');

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if( allowedFileTypes.includes(file.mimetype)) {
    cb(null, true)
  }
  else {
    cb(null, false)
  }
}

let upload = multer({ storage: multer.memoryStorage(), fileFilter });

module.exports = app => {
  app.post('/api/game/add', requireAuth, requireAdmin, upload.single('file'), addNewGame)
  app.get('/api/game/:id', getGameById)
  app.get('/api/game', getAllGames)
  app.get('/api/top/games', getGamesByTop)
  app.put('/api/game/:id', requireAuth, requireAdmin, upload.single('file'), updateGame)
  app.delete('/api/game/:id', requireAuth, requireAdmin, removeGame)
}