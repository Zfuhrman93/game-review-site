const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getUser = async (req, res) => {
  try{
    user = await User.find({ _id: req.params.id}).select('-password')
    res.json(user);
  }catch(err){
    console.log(err)
  }
}

const registerUser = async (req, res) => {
  const { body } = req;
  try{
    query = await User.findOne({email: body.email });
    if(query){
      res.status(400).json({error: "User already exists with that E-mail"});
      return;
    }
  }catch(err){
    res.status(400).json(err)
    return;
  }

  try{
    let newUser = new User(body);
    newUser = await newUser.save();
    newUser = newUser.toObject();
    delete newUser.password;
    res.json(newUser);
  }catch(error){
    console.log('Error!');
    res.status(400).json(error)
  }
  
}

// Compared against when no user matches, so unknown emails take as long as wrong
// passwords and response timing doesn't reveal which emails have accounts.
const DUMMY_HASH = bcrypt.hashSync('timing-equalizer', 10);

const login = async (req, res) => {
  const { body } = req;
  if(!body.email || !body.password){
    res.status(400).json({ error: "E-mail and password are required"});
    return;
  }

  let userQuery;
  try{
    userQuery = await User.findOne({ email: body.email });
  }catch(err){
    res.status(400).json(err);
    return;
  }

  try{
    // Same message and status whether the email or the password was wrong,
    // so the login form can't be used to check who has an account.
    const compareBool = await bcrypt.compare(body.password, userQuery ? userQuery.password : DUMMY_HASH)
    if(!userQuery || !compareBool){
      res.status(401).json({ error: "Incorrect E-mail/Password combo" });
      return;
    }
  }catch(err){
    res.status(400).json(err);
    return;
  }



  const usertoken = await jwt.sign({ _id: userQuery._id }, process.env.SECRET_KEY)
  res
    .cookie("usertoken", usertoken, {
      httpOnly: true,
      expires: new Date(Date.now() + 90000000),
    })
    .json({ message: "Login Successful" })
}


const protected = async (req, res) => {
  const protectedToken = await req.cookies.usertoken;
  if(!protectedToken){
    res.status(401).json({ error: "Not logged in" });
    return;
  }
  let decodedToken;
  decodedToken = await jwt.verify(protectedToken, process.env.SECRET_KEY);
  res.send(decodedToken._id)
}

const logout = (req, res) => {
    res.clearCookie("usertoken", {} , { signed: true, httpOnly: true, path: '/' })
    res.json({ message: "Log out successful!" })
}


module.exports = {
  registerUser,
  login,
  logout,
  protected,
  getUser,
}