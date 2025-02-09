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
      "http://localhost:5174",
      "https://full-stack-stock-monitoring-tool-frontend.vercel.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200
  })
);


const sessionoption = {
  secret: "secret key",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1 * 24 * 60 * 60 * 1000,
    maxAge: 1 * 24 * 60 * 60 * 1000,
    secure: false,
    sameSite: "lax",
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
      const existingItem = user.wishlists.find(item => item.name === data.name);
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
      let { id, uid } = req.params;
      let user = await UserModel.findById(id);
      let wishlist = await WishlistModel.findById(uid);
      let addOrder = new OrderModel({
        name: wishlist.name,
        qty: req.body.qty,
        price: req.body.price,
        mode: req.body.mode,
      });
      user.orders.push(addOrder);
      await addOrder.save();
      const quote = await yahooFinance.quote(wishlist.name);
      let avg = req.body.price / req.body.qty;
      const newHoldings = new HoldingModel({
        name: wishlist.name,
        qty: req.body.qty,
        avg: avg,
        priceBuy: req.body.price,
        currPrice: quote.regularMarketPrice,
        net: quote.regularMarketPrice - avg,
        day: quote.regularMarketChangePercent,
      });
      await newHoldings.save();
      user.holdings.push(newHoldings);
      await user.save();
      res
        .status(201)
        .json({ success: true, message: "Order added successfully" });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error adding order: ${error.message}`,
      });
    }
  })
);

app.delete(
  "/delete-order/:id",
  wrapasync(async (req, res) => {
    try {
      const { id } = req.params;
      const result = await OrderModel.deleteOne({ _id: id });
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
  res.json({
    message: "Welcome to your dashboard",
    user: req.user,
  });
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

const ordersFile = "orders.json";

const readOrders = () => {
  if (fs.existsSync(ordersFile)) {
    return JSON.parse(fs.readFileSync(ordersFile));
  }
  return [];
};

const writeOrders = (orders) => {
  fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));
};

app.post("/create-order", async (req, res) => {
  try {
    const { amount, currency, receipt, notes } = req.body;

    const order = await razorpay.orders.create({
      amount: amount,
      currency: currency,
      receipt: receipt,
      notes: notes,
    });

    const orders = readOrders();
    orders.push({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      status: "created",
    });
    writeOrders(orders);

    res.json(order);
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ error: "Error creating order" });
  }
});

const walletFile = "wallet.json";

const readWallet = () => {
  if (fs.existsSync(walletFile)) {
    return JSON.parse(fs.readFileSync(walletFile));
  }
  return {};
};

const writeWallet = (wallet) => {
  fs.writeFileSync(walletFile, JSON.stringify(wallet, null, 2));
};

const transactionsFile = "transactions.json";

const readTransactions = () => {
  if (fs.existsSync(transactionsFile)) {
    return JSON.parse(fs.readFileSync(transactionsFile));
  }
  return [];
};

const writeTransactions = (transactions) => {
  fs.writeFileSync(transactionsFile, JSON.stringify(transactions, null, 2));
};

app.post("/verify-payment/:id", (req, res) => {
  let { id } = req.params;
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const secret = razorpay.key_secret;

  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expectedSignature = crypto.createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    const orders = readOrders();
    const orderIndex = orders.findIndex((o) => o.order_id === razorpay_order_id);

    if (orderIndex !== -1) {
      orders[orderIndex].status = "paid";
      orders[orderIndex].payment_id = razorpay_payment_id;
      writeOrders(orders);

      const wallet = readWallet();
      const amount = orders[orderIndex].amount / 100;
      if (!wallet[id]) {
        wallet[id] = 0;
      }
      wallet[id] += amount;
      writeWallet(wallet);
      const transactions = readTransactions();
      transactions.push({
        userId: id,
        type: "deposit",
        amount: amount,
        date: new Date().toISOString(),
      });
      writeTransactions(transactions);

      res.json({ status: "ok" });
    }
  } else {
    res.status(400).json({ status: "invalid signature" });
  }
});


app.get("/wallet-balance/:id", (req, res) => {
  let { id } = req.params;
  const wallet = readWallet();
  const userId = id;
  const balance = wallet[userId] || 0;
  res.json({ balance });
});



app.get("/transaction-history/:id", (req, res) => {
  let { id } = req.params;
  const transactions = readTransactions();
  const userTransactions = transactions.filter(txn => txn.userId === id);
  res.json(userTransactions);
});


app.post("/withdraw-funds/:id", (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;
  if (!amount || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount" });
  }
  const wallet = readWallet();
  if (!wallet[id] || wallet[id] < amount) {
    return res.status(400).json({ error: "Insufficient funds" });
  }
  wallet[id] -= amount;
  writeWallet(wallet);
  const transactions = readTransactions();
  transactions.push({
    userId: id,
    type: "withdraw",
    amount: amount,
    date: new Date().toISOString(),
  });
  writeTransactions(transactions);
  res.json({ status: "ok", newBalance: wallet[id] });
});
app.post("/buy-stock-balence/:id", (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;
  if (!amount || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount" });
  }
  const wallet = readWallet();
  if (!wallet[id] || wallet[id] < amount) {
    return res.status(400).json({ error: "Insufficient funds" });
  }
  wallet[id] -= amount;
  writeWallet(wallet);
  const transactions = readTransactions();
  transactions.push({
    userId: id,
    type: "BUY Stock",
    amount: amount,
    date: new Date().toISOString(),
  });
  writeTransactions(transactions);
  res.json({ status: "ok", newBalance: wallet[id] });
});




app.post('/sell-stock', async (req, res) => {
  try {
    const { stockId, userId, sellQty, price } = req.body;
    if (!stockId || !userId || !sellQty || !price) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: stockId, userId, sellQty, price'
      });
    }
    const stock = await HoldingModel.findById(stockId);
    if (!stock) {
      return res.status(404).json({ 
        success: false, 
        message: 'Stock holding not found' 
      });
    }
    if (sellQty <= 0 || sellQty > stock.qty) {
      return res.status(400).json({
        success: false,
        message: `Invalid quantity. Available: ${stock.qty}`
      });
    }
    const user = await UserModel.findById(userId);
    await user.save();
    if (sellQty === stock.qty) {
      await HoldingModel.findByIdAndDelete(stockId);
      await UserModel.findByIdAndUpdate(
        userId,
        { $pull: { holdings: stockId } }
      );
      const wallet = readWallet();
      wallet[userId] += price;
      writeWallet(wallet);
      const transactions = readTransactions();
      transactions.push({
        userId: userId,
        type: "SELLStock",
        amount: price,
        date: new Date().toISOString(),
      });
      writeTransactions(transactions);
    } else {
      await HoldingModel.findByIdAndUpdate(
        stockId,
        { 
          $inc: { qty: -sellQty },
          $set: { priceBuy: stock.priceBuy - price }
        }
      );
      const wallet = readWallet();
      wallet[userId] += price;
      writeWallet(wallet);
      const transactions = readTransactions();
      transactions.push({
        userId: userId,
        type: "SELLStock",
        amount: price,
        date: new Date().toISOString(),
      });
      writeTransactions(transactions);
    }
    res.status(200).json({
      success: true,
      message: `Sold ${sellQty} shares of ${stock.name}`,
      newBalance: user.balance
    });

  } catch (error) {
    console.error('Sell error:', error);
    res.status(500).json({
      success: false,
      message: 'Transaction failed',
      error: error.message
    });
  }
});
app.get("/", (req, res)=>{
  res.send("hello");
})
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
