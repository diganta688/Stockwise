require("dotenv").config();
const {verifyToken} = require("./util/jwt");
const {UserModel}  =require("./model/User")

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
