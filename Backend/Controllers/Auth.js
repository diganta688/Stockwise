require("dotenv").config();
const { UserModel } = require("../model/User");
const { generateToken, verifyToken } = require("../util/jwt");

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // Only send cookies over HTTPS in production
  sameSite: "None",
  maxAge: 24 * 60 * 60 * 1000, // 1 day
};

module.exports.Signup = async (req, res) => {
  try {
    const { name, username, email, password, phoneNumber } = req.body;
    const existingUser = await UserModel.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ message: "Email already exists" });
      }
      if (existingUser.username === username) {
        return res.status(400).json({ message: "Username already exists" });
      }
    }
    const user = await UserModel.create({
      name,
      username,
      email,
      password,
      phoneNumber,
    });
    const token = generateToken(user._id);
    res.cookie("jwt", token, cookieOptions);
    res.status(201).json({
      message: "User signed up successfully",
      success: true,
      redirectTo: `${process.env.VITE_API_URL_DASHBOARD}/dashboard/${user._id}/summery`,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports.Login = async (req, res) => {
  try {
    const { username, password, phoneNumber } = req.body;
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    if (user.phoneNumber !== phoneNumber) {
      return res.status(401).json({ message: "Username & phone don't match" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user._id);
    res.cookie("jwt", token, cookieOptions);
    res.status(200).json({
      message: "User logged in successfully",
      success: true,
      redirectTo: `${process.env.VITE_API_URL_DASHBOARD}/dashboard/${user._id}/summery`,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.protect = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token)
      return res.status(401).json({ status: false, error: "Unauthorized" });
    const decoded = verifyToken(token);
    const user = await UserModel.findById(decoded.userId);
    if (!user) {
      return res
        .status(401)
        .json({ status: false, error: "User no longer exists" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Protect middleware error:", error);
    res.clearCookie("jwt", cookieOptions);
    res.status(401).json({ status: false, error: "Invalid token" });
  }
};

module.exports.logout = (req, res) => {
  res.clearCookie("jwt", cookieOptions);
  res.status(200).json({ success: true, message: "Logged out successfully" });
};
