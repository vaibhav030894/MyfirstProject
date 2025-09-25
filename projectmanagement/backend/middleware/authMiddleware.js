const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req,res,next) => {
  const authHeader = req.headers.authorization;
  if(!authHeader) return res.status(401).json({message:"No token"});

  const token = authHeader.split(' ')[1];
  if(!token) return res.status(401).json({message:"Invalid token"});

  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch(err){
    res.status(401).json({message:"Unauthorized"});
  }
};
