const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (userId) => {
  console.log('JWT_SECRET:', process.env.JWT_SECRET);
  return jwt.sign({userId} , process.env.JWT_SECRET);
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };