require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const fs = require("fs");
const { Signup, Login, protect, logout } = require("./Controllers/Auth");
const mongo_url = process.env.MONGO_URL;
const { HoldingModel } = require("./model/Holdings");
const { OrderModel } = require("./model/Orders");
const { WishlistModel } = require("./model/Wishlist");
const { UserModel } = require("./model/User");
const OrderPayment = require("./model/OrderPayment");
const Wallet = require("./model/Wallet");
const Transaction = require("./model/Transaction");
const expresserr = require("./extra/expressErr");
const wrapasync = require("./extra/wrapasync");
const cookieParser = require("cookie-parser");
const yahooFinance = require("yahoo-finance2").default;
const accoutSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
const client = require("twilio")(accoutSid, authToken, {
  autoRetry: true,
  maxRetries: 3,
});

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
    secure: process.env.NODE_ENV === "production", // Only send cookies over HTTPS in production
  sameSite: "None",
  },
};

app.use(session(sessionoption));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.post(
  "/addWishlist/:id",
  wrapasync(async (req, res, next) => {
    try {
      let { id } = req.params;
      const { data } = req.body;
      const user = await UserModel.findById(id).populate("wishlists");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const existingItem = user.wishlists.find(
        (item) => item.name === data.name
      );
      if (existingItem) {
        return res
          .status(400)
          .json({ message: "Stock already in your Wishlist" });
      }
      if (user.wishlists.length >= 10) {
        return res.status(400).json({ message: "Wishlist size full" });
      }
      const newItem = await WishlistModel.create({
        name: data.name,
        price: data.price,
        percent: data.percent,
        change: data.change,
        prevClose: data.prevClose,
        open: data.open,
      });
      user.wishlists.push(newItem);
      await user.save();
      res.status(200).json({ message: "Stock added", item: newItem });
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  })
);

app.post(
  "/delete-from-wishlist/:id",
  wrapasync(async (req, res, next) => {
    let { data } = req.body;
    let { id } = req.params;
    try {
      await WishlistModel.findByIdAndDelete(data);
      await UserModel.findByIdAndUpdate(id, { $pull: { wishlists: data } });
      res.json({ message: "Wishlist item deleted successfully" });
    } catch (e) {
      res.status(500).json({ message: "Internal server error" });
    }
  })
);

app.get(
  "/allwishlist/:id",
  wrapasync(async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user ID" });
    }
    const user = await UserModel.findById(id).populate("wishlists");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, wishlists: user.wishlists });
  })
);

app.get(
  "/allHoldings/:id",
  wrapasync(async (req, res, next) => {
    try {
      let { id } = req.params;
      let user = await UserModel.findById(id).populate("holdings");

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      res.status(200).json({ success: true, holdings: user.holdings });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error fetching holdings: ${error.message}`,
      });
    }
  })
);

app.post(
  "/update-wishlist",
  wrapasync(async (req, res) => {
    try {
      let { data } = req.body;
      if (!Array.isArray(data) || data.length === 0) {
        return res.status(400).json({ message: "Invalid data format" });
      }
      const bulkOperations = data.map((item) => {
        const { _id, ...updateData } = item;
        return {
          updateOne: {
            filter: { name: item.name },
            update: { $set: updateData },
            upsert: true,
          },
        };
      });
      let result = await WishlistModel.bulkWrite(bulkOperations);
      res.status(200).json({
        message: "Wishlist data updated successfully",
        result,
      });
    } catch (error) {
      console.error("Error updating wishlist data:", error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  })
);

app.post(
  "/update-holding",
  wrapasync(async (req, res) => {
    try {
      let { data } = req.body;
      if (!Array.isArray(data) || data.length === 0) {
        return res.status(400).json({ message: "Invalid data format" });
      }
      const bulkOperations = data.map((item) => {
        const { _id, ...updateData } = item;
        return {
          updateOne: {
            filter: { name: item.name },
            update: { $set: updateData },
            upsert: true,
          },
        };
      });
      let result = await HoldingModel.bulkWrite(bulkOperations);
      res.status(200).json({
        message: "Wishlist data updated successfully",
        result,
      });
    } catch (error) {
      console.error("Error updating wishlist data:", error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  })
);

app.get(
  "/allOrders/:id",
  wrapasync(async (req, res, next) => {
    try {
      let { id } = req.params;
      let user = await UserModel.findById(id).populate("orders");

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      res.status(200).json({ success: true, orders: user.orders });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error fetching orders: ${error.message}`,
      });
    }
  })
);

app.post(
  "/fetch-order-details/:uid",
  wrapasync(async (req, res, next) => {
    try {
      let { uid } = req.params;
      let wishlist = await WishlistModel.findById(uid);
      res.status(200).json({ success: true, message: wishlist });
    } catch (error) {
      res.status(400).json({ messsage: error });
    }
  })
);

app.post(
  "/addOrder/:id/:uid",
  wrapasync(async (req, res, next) => {
    try {
      const { id, uid } = req.params;
      const user = await UserModel.findById(id);
      if (!user) return res.status(404).json({ message: "User not found" });
      const wishlist = await WishlistModel.findById(uid);
      if (!wishlist)
        return res.status(404).json({ message: "Stock not found" });
      const addOrder = await OrderModel.create({
        user: id,
        name: wishlist.name,
        qty: req.body.qty,
        price: req.body.price,
        mode: req.body.mode,
      });
      user.orders.push(addOrder);
      await addOrder.save();
      const quote = await yahooFinance.quote(wishlist.name);
      let avg = req.body.price / req.body.qty;
      const newHoldings = await HoldingModel.create({
        name: wishlist.name,
        qty: req.body.qty,
        avg: avg,
        priceBuy: req.body.price,
        currPrice: quote.regularMarketPrice,
        net: quote.regularMarketPrice - avg,
        day: quote.regularMarketChangePercent,
      });
      user.holdings.push(newHoldings);
      await user.save();
      res
        .status(201)
        .json({ success: true, message: "Order added successfully" });
    } catch (error) {
      console.error("Order error:", error);
      res
        .status(500)
        .json({ message: "Order creation failed", error: error.message });
    }
  })
);

app.delete(
  "/delete-order/:orderid/:id",
  wrapasync(async (req, res) => {
    try {
      const { orderid, id } = req.params;
      const result = await OrderModel.deleteOne({ _id: orderid });
      await UserModel.findByIdAndUpdate(id, { $pull: { orders: orderid } });
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      console.error("Error deleting order:", error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  })
);

app.post(
  "/signup/mobile",
  wrapasync(async (req, res, next) => {
    const { phoneNumber } = req.body;
    const generateOTP = Math.floor(100000 + Math.random() * 900000).toString();
    client.messages
      .create({
        body: `your one-time-password for verification is ${generateOTP}`,
        to: phoneNumber,
        from: twilioPhone,
      })
      .then((message) => {
        return res.status(200).json({
          success: true,
          redirectTo: "/otp-verification",
          generateOTP,
        });
      })
      .catch((e) => {
        res.status(409).json({ success: false, message: "Error sending otp" });
      });
  })
);

app.post(
  "/mobile-verification",
  wrapasync(async (req, res, next) => {
    const { phoneNumber } = req.body;
    try {
      const user = await UserModel.findOne({ phoneNumber });
      if (user) {
        res.status(200).json({ redirectTo: "/login" });
      } else {
        res
          .status(200)
          .json({ success: true, redirectTo: "/Signup/user-details" });
      }
    } catch (e) {
      console.error("Error checking phone number:", e);
      res
        .status(500)
        .json({ success: false, messsage: "Internal Server Error" });
    }
  })
);

app.post("/signup/final", Signup);
app.post("/login/final", Login);
app.get("/dashboard/:id", protect, (req, res) => {
  res.status(200).json({ message: "Protected route accessed" });
});
app.post("/logout", logout);

app.post("/user/find", async (req, res, next) => {
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

app.post("/search-stock", async (req, res, next) => {
  let { name } = req.body;
  try {
    const quote = await yahooFinance.quote(name);
    res.status(200).json({ success: true, data: quote });
  } catch (error) {
    console.error("Error fetching stock data:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching stock data" });
  }
});

app.post("/update-stock-wishlist", async (req, res, next) => {
  const { names } = req.body;
  if (!names || !Array.isArray(names)) {
    return res.status(400).json({
      success: false,
      message: "Invalid input: names must be an array",
    });
  }

  try {
    const quote = await yahooFinance.quote(names);
    res.status(200).json({ success: true, data: quote });
  } catch (error) {
    console.error("Error fetching stock data:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching stock data" });
  }
});

const razorpay = new Razorpay({
  key_id: process.env.RAZOR_PAY_ID,
  key_secret: process.env.RAZOR_PAY_SECRET,
});

app.post("/create-order", async (req, res) => {
  try {
    const { amount, currency, receipt, notes } = req.body;
    const order = await razorpay.orders.create({
      amount,
      currency,
      receipt,
      notes,
    });
    const newOrder = new OrderPayment({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      status: "created",
    });
    await newOrder.save();
    res.json(order);
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ error: "Error creating order" });
  }
});

app.post("/verify-payment/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const secret = process.env.RAZOR_PAY_SECRET;
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ status: "invalid signature" });
    }
    const order = await OrderPayment.findOneAndUpdate(
      { order_id: razorpay_order_id },
      { status: "paid", payment_id: razorpay_payment_id },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    let wallet = await Wallet.findOne({ userId: id });

    if (!wallet) {
      wallet = new Wallet({ userId: id, balance: order.amount / 100 });
    } else {
      wallet.balance += order.amount / 100;
    }
    await wallet.save();
    const transaction = new Transaction({
      userId: id,
      type: "deposit",
      amount: order.amount / 100,
    });
    await transaction.save();
    res.json({ status: "ok" });
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({ error: "Error verifying payment" });
  }
});

app.get("/wallet-balance/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const wallet = await Wallet.findOne({ userId: id });

    res.json({ balance: wallet ? wallet.balance : 0 });
  } catch (error) {
    console.error("Wallet balance error:", error);
    res.status(500).json({ error: "Error fetching wallet balance" });
  }
});

app.get("/transaction-history/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const transactions = await Transaction.find({ userId: id });

    res.json(transactions);
  } catch (error) {
    console.error("Transaction history error:", error);
    res.status(500).json({ error: "Error fetching transaction history" });
  }
});

app.post("/withdraw-funds/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const wallet = await Wallet.findOne({ userId: id });

    if (!wallet || wallet.balance < amount) {
      return res.status(400).json({ error: "Insufficient funds" });
    }

    wallet.balance -= amount;
    await wallet.save();

    const transaction = new Transaction({
      userId: id,
      type: "withdraw",
      amount,
    });

    await transaction.save();

    res.json({ status: "ok", newBalance: wallet.balance });
  } catch (error) {
    console.error("Withdraw funds error:", error);
    res.status(500).json({ error: "Error withdrawing funds" });
  }
});

app.post("/buy-stock-balence/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }
    const wallet = await Wallet.findOne({ userId: id });
    if (!wallet || wallet.balance < amount) {
      console.error(error);
      return res.status(400).json({ error: "Insufficient funds" });
    }
    wallet.balance -= amount;
    await wallet.save();
    const transaction = new Transaction({
      userId: id,
      type: "BUY Stock",
      amount,
    });
    await transaction.save();
    res.json({ status: "ok", newBalance: wallet.balance });
  } catch (error) {
    console.error("Buy stock error:", error);
    res.status(500).json({ error: "Error buying stock" });
  }
});

app.post("/sell-stock", async (req, res) => {
  try {
    const { stockId, userId, sellQty, price } = req.body;
    if (!stockId || !userId || !sellQty || !price) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: stockId, userId, sellQty, price",
      });
    }
    const stock = await HoldingModel.findById(stockId);
    if (!stock) {
      return res.status(404).json({
        success: false,
        message: "Stock holding not found",
      });
    }
    if (sellQty <= 0 || sellQty > stock.qty) {
      return res.status(400).json({
        success: false,
        message: `Invalid quantity. Available: ${stock.qty}`,
      });
    }
    let wallet = await Wallet.findOne({ userId });
    if (!wallet) {
      wallet = new Wallet({ userId, balance: 0 });
    }
    if (sellQty === stock.qty) {
      await HoldingModel.findByIdAndDelete(stockId);
      await UserModel.findByIdAndUpdate(userId, {
        $pull: { holdings: stockId },
      });
    } else {
      await HoldingModel.findByIdAndUpdate(stockId, {
        $inc: { qty: -sellQty },
        $set: { priceBuy: stock.priceBuy - price },
      });
    }
    wallet.balance += price;
    await wallet.save();
    const transaction = new Transaction({
      userId,
      type: "SELLStock",
      amount: price,
    });
    await transaction.save();
    res.status(200).json({
      success: true,
      message: `Sold ${sellQty} shares of ${stock.name}`,
      newBalance: wallet.balance,
    });
  } catch (error) {
    console.error("Sell error:", error);
    res.status(500).json({
      success: false,
      message: "Transaction failed",
      error: error.message,
    });
  }
});

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
