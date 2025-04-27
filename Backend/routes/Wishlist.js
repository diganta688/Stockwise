const express = require("express");
const router = express.Router();
require("dotenv").config();
const wrapasync = require("../extra/wrapasync");
const Wishlist = require("../Controller/Wishlist");

router.post("/addWishlist/:id", wrapasync(Wishlist.addWishlist));
router.post("/delete-from-wishlist/:id", wrapasync(Wishlist.deleteFromWishlist));
router.get("/allwishlist/:id", wrapasync(Wishlist.allWishlist));
router.post("/update-wishlist", wrapasync(Wishlist.updateWishlist));
router.post("/update-stock-wishlist", wrapasync(Wishlist.updateStockWishlist));

module.exports = router;
