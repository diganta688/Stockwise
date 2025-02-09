const { Schema, model } = require("mongoose");

const OrderSchema = new Schema({
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  price: { type: Number, required: true },
  mode: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const OrderModel = model("Orders", OrderSchema);

module.exports = { OrderModel };
