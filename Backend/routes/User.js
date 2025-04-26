require("dotenv").config();
const express = require("express");
const router = express.Router();
const { UserModel } = require("../model/User");
const wrapasync = require("../extra/wrapasync");
const {protect} = require("../middleware");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const { generateToken, verifyToken } = require("../util/jwt");
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production" ? true : false,
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 24 * 60 * 60 * 1000,
};

router.post("/signup/final", async (req, res) => {
    try {
      const { name, username, email, password, phoneNumber } = req.body;
      const existingUser = await UserModel.findOne({
        $or: [{ phoneNumber }, { username }],
      });
      if (existingUser) {
        if (existingUser.phoneNumber === phoneNumber) {
          return res.status(400).json({ message: "phoneNumber already exists" });
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
  });

router.post(
  "/signup/email",
  wrapasync(async (req, res, next) => {
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required." });
    }
    const generateOTP = Math.floor(100000 + Math.random() * 900000).toString();
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your One-Time Password (OTP) for Verification",
      text: `Your one-time password for verification is ${generateOTP}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res
          .status(409)
          .json({ success: false, message: "Error sending OTP email." });
      } else {
        return res.status(200).json({
          success: true,
          redirectTo: "/otp-verification",
          generateOTP,
        });
      }
    });
  })
);

router.post(
  "/email-verification",
  wrapasync(async (req, res, next) => {
    const { email } = req.body;
    try {
      const user = await UserModel.findOne({ email });
      if (user) {
        res.status(200).json({ redirectTo: "/login" });
      } else {
        res
          .status(200)
          .json({ success: true, redirectTo: "/Signup/user-details" });
      }
    } catch (e) {
      console.error("Error checking Email address:", e);
      res
        .status(500)
        .json({ success: false, messsage: "Internal Server Error" });
    }
  })
);

router.post("/login/final",  async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    if (user.email !== email) {
      return res.status(401).json({ message: "Username & email don't match" });
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
});

router.get("/dashboard/:id", protect, async (req, res) => {
  try {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).json({ status: false, error: "Invalid user ID" });
    }
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ status: false, error: "User not found" });
    }
    res
      .status(200)
      .json({ message: "Welcome to the Home Page", user: req.user });
  } catch (error) {
    console.error("Dashboard route error:", error);
    res.status(500).json({ status: false, error: "Server error" });
  }
});

router.post("/find", async (req, res, next) => {
    let { uId } = req.body;
    try {
      let userFound = await UserModel.findById(uId);
      if (!userFound) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
      res
        .status(200)
        .json({ success: true, message: "User found", user: userFound });
    } catch (error) {
      next(error);
    }
  });

  router.post("/logout", (req, res) => {
    res.clearCookie("jwt", cookieOptions);
    res.status(200).json({ success: true, message: "Logged out successfully" });
  });


  module.exports = router;