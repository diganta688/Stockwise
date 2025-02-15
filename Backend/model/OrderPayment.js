const mongoose = require("mongoose");

const orderPaymentSchema = new mongoose.Schema({
  order_id: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  receipt: { type: String, required: true },
  status: { type: String, required: true, default: "created" },
  payment_id: { type: String, unique: true },
}, { timestamps: true });

const OrderPayment = mongoose.model("OrderPayment", orderPaymentSchema);
module.exports = OrderPayment;
