require("dotenv").config();
const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const { HoldingModel } = require("../model/Holdings");
const { UserModel } = require("../model/User");
const OrderPayment = require("../model/OrderPayment");
const Wallet = require("../model/Wallet");
const Transaction = require("../model/Transaction");


const razorpay = new Razorpay({
    key_id: process.env.RAZOR_PAY_ID,
    key_secret: process.env.RAZOR_PAY_SECRET,
  });

  router.post("/create-order", async (req, res) => {
    try {
      const { amount, currency = "INR", receipt, notes } = req.body;
      if (!amount || !receipt) {
        return res.status(400).json({ error: "Amount and receipt are required" });
      }
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

  router.post("/verify-payment/:id", async (req, res) => {
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
      res.json({ status: "ok", newBalance: wallet.balance });
    } catch (error) {
      console.error("Payment verification error:", error);
      res.status(500).json({ error: "Error verifying payment" });
    }
  });

  router.get("/wallet-balance/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const wallet = await Wallet.findOne({ userId: id });
  
      res.json({ balance: wallet ? wallet.balance : 0 });
    } catch (error) {
      console.error("Wallet balance error:", error);
      res.status(500).json({ error: "Error fetching wallet balance" });
    }
  });

  router.get("/transaction-history/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { type } = req.query;
      const filter = { userId: id };
      if (type) filter.type = type;
      const transactions = await Transaction.find(filter).sort({ createdAt: -1 });
      res.json(transactions);
    } catch (error) {
      console.error("Transaction history error:", error);
      res.status(500).json({ error: "Error fetching transaction history" });
    }
  });

  router.post("/withdraw-funds/:id", async (req, res) => {
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

  router.post("/buy-stock-balence/:id", async (req, res) => {
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

  router.post("/sell-stock", async (req, res) => {
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

  module.exports = router;