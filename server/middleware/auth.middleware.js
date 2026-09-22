const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const requireAuth = async (req, res, next) => {
  const token = req.cookies.usertoken;
  if(!token){
    return res.status(401).json({ error: "Not logged in" });
  }
  try{
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decoded._id;
    next();
  }catch(err){
    return res.status(401).json({ error: "Invalid or expired session" });
  }
}

const requireAdmin = async (req, res, next) => {
  try{
    const user = await User.findById(req.userId);
    if(!user || !user.admin){
      return res.status(403).json({ error: "Admins only" });
    }
    next();
  }catch(err){
    return res.status(403).json({ error: "Admins only" });
  }
}

module.exports = { requireAuth, requireAdmin };
