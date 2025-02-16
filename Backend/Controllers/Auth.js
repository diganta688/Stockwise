

require('dotenv').config();
const {UserModel} = require('../model/User');
const {generateToken, verifyToken} = require("../util/jwt")


module.exports.Signup = async (req, res) => {
  try {
    const { name, username, email, password, phoneNumber } = req.body;
    const existingUser = await UserModel.findOne({ 
      $or: [{ email }, { username }] 
    });
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      if (existingUser.username === username) {
        return res.status(400).json({ message: 'Username already exists' });
      }
    }
    const user = await UserModel.create({ name, username, email, password, phoneNumber });
    const token = generateToken(user._id);
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === "production", 
    });
    res.status(201).json({
      message: "User signed up successfully",
      success: true,
      redirectTo: `${process.env.VITE_API_URL_DASHBOARD}/dashboard/${user._id}/summery`,
    });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: error.message });
  }
};

module.exports.Login = async (req, res) => {
  try {
    const { username, password,phoneNumber } = req.body;
        const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    if(user.phoneNumber !== phoneNumber){
      return res.status(401).json({ message: "username & Phone doesn\'t march" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = generateToken(user._id);
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === "production", 
    });
    res.status(201).json({
      message: "User login up successfully",
      success: true,
      redirectTo: `${process.env.VITE_API_URL_DASHBOARD}/dashboard/${user._id}/summery`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.protect = async (req, res, next) => {
  let {id} = req.params;
  try {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ status: false, error: 'Unauthorized' });
    const decoded = verifyToken(token);
    const user = await UserModel.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ status: false, error: 'User no longer exists' });
    }
    await UserModel.findById(id);
    req.user = user;
    next();
  } catch (error) {      
    res.clearCookie("jwt", {
      httpOnly: true,
      expires: new Date(0),
      sameSite: 'Strict',
      secure: process.env.NODE_ENV === "production", 
    });
    res.status(401).json({ status: false, error: 'Invalid token' });
  }
};


module.exports.logout = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
    sameSite: 'Strict',
    secure: process.env.NODE_ENV === "production", 
  });
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};
