require('dotenv').config();
const {UserModel} = require('../model/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });
};

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
      secure: true,
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000
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
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 24 * 60 * 60 * 1000
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
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ status: false, message: 'Not authorized' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.id);
    if (!user) {
      return res.status(403).json({ status: false, message: 'Access denied' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ status: false, message: 'Invalid token' });
  }
};

module.exports.logout = (req, res) => {
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict'
  });
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};