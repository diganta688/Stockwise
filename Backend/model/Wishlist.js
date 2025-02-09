const { Schema, model } = require("mongoose");

const WishlistSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  percent: {
    type: String,
    required: true
  },
  change:{
    type: String,
    required: true
  },
  prevClose:{
    type: Number,
    required: true
  },
  open:{
    type: Number,
    required: true
  },
});

const WishlistModel = new model("Wishlists", WishlistSchema);

module.exports = { WishlistModel, WishlistSchema };
