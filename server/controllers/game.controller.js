const Game = require('../models/game.model');
const cloudinary = require('../config/cloudinary.config');

const uploadCoverToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'game-review/covers' },
      (err, result) => {
        if (err) return reject(err);
        resolve(result.secure_url);
      }
    );
    uploadStream.end(buffer);
  });
}

const addNewGame = async (req, res) => {
  const name = req.body.name;
  const xbox = req.body.xbox;
  const PS4 = req.body.PS4;
  const nSwitch = req.body.nSwitch;
  const PC = req.body.PC;

  try{
    const gameCover = await uploadCoverToCloudinary(req.file.buffer);
    const data = { name, xbox, PS4, nSwitch, PC, gameCover}
    const newGame = new Game(data);
    await newGame.save();
    res.json(newGame);
  }catch(err){
    console.log('Error!');
    res.status(400).json(err);
  }
}

const getAllGames = async (req, res) => {
  try{
    const allGames = await Game.find()
    res.json(allGames)
  }catch(err){
    console.log('Error!');
    res.status(400).json(err);
  }
}

const getGameById = async(req, res) => {
  try{
    const foundGame = await Game.find({ _id: req.params.id })
    res.json(foundGame);
  }catch(err){
    console.log('Error!');
    res.status(400).json(err);
  }
}

const getGamesByTop = async(req, res) => {
  try{
    const games = await Game.find({ topPick: true })
    res.json(games);
  }catch(err){
    res.status(400).json(err);
  }
}

const updateGame = async (req, res) => {
  try{
    const data = { ...req.body };
    if(req.file){
      data.gameCover = await uploadCoverToCloudinary(req.file.buffer);
    }
    const updatedGame = await Game.findOneAndUpdate({ _id: req.params.id },
      data,
      { returnDocument: 'after', runValidators:true })
    res.json(updatedGame);
  }catch(err){
    console.log('Error!');
    res.status(400).json(err);
  }
}

const removeGame = async (req, res) => {
  try{
    const deletedGame = await Game.deleteOne({ _id: req.params.id })
    res.json(deletedGame);
  }catch(err){
    console.log('Error!');
    res.status(400).json(err);
  }
}

module.exports = {
  addNewGame,
  getAllGames,
  getGameById,
  getGamesByTop,
  updateGame,
  removeGame,

}