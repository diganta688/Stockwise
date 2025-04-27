require("dotenv").config();
const express = require("express");
const router = express.Router();
const wrapasync = require("../extra/wrapasync");
const { protect } = require("../middleware");
const user  = require("../Controller/User");

router.post("/signup/final", user.Signup);
router.post("/signup/email", wrapasync(user.OtpSentToEmail));
router.post("/email-verification", wrapasync(user.EmailCheck));
router.post("/login/final", user.Login);
router.get("/dashboard/:id", protect, user.Dashboard);
router.post("/find", user.UserFind);
router.post("/logout", user.Logout);


module.exports = router;
