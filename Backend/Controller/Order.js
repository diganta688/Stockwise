const { HoldingModel } = require("../model/Holdings");
const { OrderModel } = require("../model/Orders");
const { WishlistModel } = require("../model/Wishlist");
const { UserModel } = require("../model/User");
const yahooFinance = require("yahoo-finance2").default;

exports.getAllOrders = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id).populate("orders");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, orders: user.orders });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: `Error fetching orders: ${error.message}`,
      });
  }
};

exports.fetchOrderDetails = async (req, res) => {
  try {
    const { uid } = req.params;
    const wishlist = await WishlistModel.findById(uid);
    res.status(200).json({ success: true, message: wishlist });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.addOrder = async (req, res) => {
  try {
    const { id, uid } = req.params;
    const user = await UserModel.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const wishlist = await WishlistModel.findById(uid);
    if (!wishlist) return res.status(404).json({ message: "Stock not found" });

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
    const avg = req.body.price / req.body.qty;

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
};

exports.deleteOrder = async (req, res) => {
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
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
