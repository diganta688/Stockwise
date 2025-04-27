require("dotenv").config();
const { WishlistModel } = require("../model/Wishlist");
const { UserModel } = require("../model/User");
const mongoose = require("mongoose");
const yahooFinance = require("yahoo-finance2").default;

exports.addWishlist = async (req, res) => {
  try {
    let { id } = req.params;
    const { data } = req.body;

    const user = await UserModel.findById(id).populate("wishlists");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingItem = user.wishlists.find((item) => item.name === data.name);
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
};

exports.deleteFromWishlist = async (req, res) => {
  try {
    let { data } = req.body;
    let { id } = req.params;

    await WishlistModel.findByIdAndDelete(data);
    await UserModel.findByIdAndUpdate(id, { $pull: { wishlists: data } });

    res.json({ message: "Wishlist item deleted successfully" });
  } catch (error) {
    console.error("Error deleting from wishlist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.allWishlist = async (req, res) => {
  try {
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
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateWishlist = async (req, res) => {
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
};

exports.updateStockWishlist = async (req, res) => {
  try {
    const { names } = req.body;

    if (!names || !Array.isArray(names)) {
      return res.status(400).json({
        success: false,
        message: "Invalid input: names must be an array",
      });
    }

    const quote = await yahooFinance.quote(names);

    res.status(200).json({ success: true, data: quote });
  } catch (error) {
    console.error("Error fetching stock data:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching stock data" });
  }
};
