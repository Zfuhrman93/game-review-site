const { addNewGame, getAllGames, getGameById, removeGame, updateGame, getGamesByTop } = require('../controllers/game.controller');
const { requireAuth, requireAdmin } = require('../middleware/auth.middleware');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '../../client/src/images'))
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + ".AVIF")
  }
})

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if( allowedFileTypes.includes(file.mimetype)) {
    cb(null, true)
  }
  else {
    cb(null, false)
  }
}

let upload = multer({ storage, fileFilter });

module.exports = app => {
  app.post('/api/game/add', requireAuth, requireAdmin, upload.single('file'), addNewGame)
  app.get('/api/game/:id', getGameById)
  app.get('/api/game', getAllGames)
  app.get('/api/top/games', getGamesByTop)
  app.put('/api/game/:id', requireAuth, requireAdmin, updateGame)
  app.delete('/api/game/:id', requireAuth, requireAdmin, removeGame)
}