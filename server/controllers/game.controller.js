const Game = require('../models/game.model');
const Sharp = require('sharp')

const addNewGame = async (req, res) => {
  const name = req.body.name;
  const systems = req.body.systems;
  console.log(req.file)
  let gameCover
  Sharp(req.file.filename)                        
    .webp()                   
    .then( newBuffer => gameCover = newBuffer )

  const data = { name, systems, gameCover}
  try{
    const newGame = await new Game(data);
    newGame.save()
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
    const games = Game.find({ topPick: true })
    res.json(games);
  }catch(err){
    res.status(400).json(err);
  }
}

const updateGame = async (req, res) => {
  try{
    const updatedGame = await Game.findOneAndUpdate({ _id: req.params.id },
      req.body,
      { new:true, runValidators:true })
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