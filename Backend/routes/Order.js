require("dotenv").config();
const express = require("express");
const router = express.Router();
const wrapasync = require("../extra/wrapasync");
const Order = require("../Controller/Order");

router.get("/allOrders/:id", wrapasync(Order.getAllOrders));
router.post("/fetch-order-details/:uid", wrapasync(Order.fetchOrderDetails));
router.post("/addOrder/:id/:uid", wrapasync(Order.addOrder));
router.delete("/delete-order/:orderid/:id", wrapasync(Order.deleteOrder));

module.exports = router;
