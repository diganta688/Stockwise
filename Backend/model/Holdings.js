const { Schema, model } = require("mongoose");

const HoldingSchema = new Schema({
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  avg: { type: Number, required: true },
  priceBuy: { type: Number, required: true },
  currPrice: { type: Number, required: true },
  net: { type: Number, required: true },
  day: { type: Number, required: true },
});

const HoldingModel = model("Holding", HoldingSchema);

module.exports = { HoldingModel };
