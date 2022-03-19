const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const token = jwt.sign({ _id: 'defdfdsafdfdsaf'}, process.env.SECRET_KEY);
const unencoded = jwt.verify(token, process.env.SECRET_KEY);


const registerUser = async (req, res) => {
  const { body } = req;
  try{
    query = await User.findOne({email: body.email });
    if(query){
      res.status(400).json({errorMessage: "User already exists with that E-mail"});
      return;
    }
  }catch(err){
    res.status(400).json(err)
  }

  try{
    let newUser = new User(body);
    newUser = await newUser.save();
    res.json(newUser);
  }catch(error){
    console.log('Error!');
    res.status(400).json(error)
  }
  
}

const login = async (req, res) => {
  const { body } = req;
  if(!body.email){
    res.status(400).json({ error: "No E-mail provided"});
    return;
  }

  let userQuery;
  try{
    userQuery = await User.findOne({ email: body.email });
  }catch(err){
    res.status(400).json(err);
    return;
  }

  console.log(userQuery);

  if(userQuery === null){
    res.status(400).json({ error: "Cannot find user with that E-mail" });
    return;
  }

  try{
    const compareBool = await bcrypt.compare(body.password, userQuery.password)
    if(!compareBool){
      res.status(401).json({ error: "Incorrect E-mail/Password combo" });
      return;
    }
  }catch(err){
    res.status(400).json(err);
    return;
  }



  const userToken = await jwt.sign({ _id: userQuery._id }, process.env.SECRET_KEY)
  res
    .cookie("usertoken", userToken, process.env.SECRET_KEY, {
      httpOnly: true,
      expires: new Date(Date.now() + 90000000),
    })
    .json({ message: "Login Successful" })
}

module.exports = {
  registerUser,
  login,
}