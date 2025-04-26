require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const wishlist = require("./routes/Wishlist");
const holding = require("./routes/Holding");
const order = require("./routes/Order");
const Payment = require("./routes/Payment");
const user = require("./routes/User");
const search = require("./routes/Search");
const mongo_url = process.env.MONGO_URL;
const expresserr = require("./extra/expressErr");
const cookieParser = require("cookie-parser");
app.use(
  cors({
    origin: [
      process.env.VITE_API_URL_DASHBOARD,
      process.env.VITE_API_URL_FRONTEND,
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors());

const sessionoption = {
  secret: "secret key",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1 * 24 * 60 * 60 * 1000,
    maxAge: 1 * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  },
};

app.use(session(sessionoption));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());



app.use("/wishlist", wishlist);
app.use("/holding", holding);
app.use("/order", order);
app.use("/payment", Payment);
app.use("/user", user);
app.use("/search", search);


app.get("/", (req, res) => {
  res.send("hello");
});
app.all("*", (req, res, next) => {
  next(new expresserr(404, "We couldn’t find the page you were looking for."));
});

app.use((err, req, res, next) => {
  let { status = 500, message = "Something went wrong" } = err;
  res.status(status).json({ error: message });
});

app.listen(process.env.PORT || 8080, () => {
  mongoose
    .connect(mongo_url)
    .then(() => {
      console.log("DB connected");
    })
    .catch((error) => {
      console.error(`DB connection error: ${error.message}`);
    });
});
