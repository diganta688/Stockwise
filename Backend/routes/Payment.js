const express = require("express");
const router = express.Router();
const Payment = require("../Controller/Payment");

router.post("/create-order", Payment.createOrder);
router.post("/verify-payment/:id", Payment.verifyPayment);
router.get("/wallet-balance/:id", Payment.getWalletBalance);
router.get("/transaction-history/:id", Payment.getTransactionHistory);
router.post("/withdraw-funds/:id", Payment.withdrawFunds);
router.post("/buy-stock-balence/:id", Payment.buyStock);
router.post("/sell-stock", Payment.sellStock);

module.exports = router;
