require("dotenv").config();
const express = require("express");
const router = express.Router();
const { HoldingModel } = require("../model/Holdings");
const { UserModel } = require("../model/User");
const wrapasync = require("../extra/wrapasync");

router.get(
  "/allHolding/:id",
  wrapasync(async (req, res, next) => {
    try {
      let { id } = req.params;
      let user = await UserModel.findById(id).populate("holdings");

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      res.status(200).json({ success: true, holdings: user.holdings });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error fetching holdings: ${error.message}`,
      });
    }
  })
);

router.post(
  "/update-holding",
  wrapasync(async (req, res) => {
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
      let result = await HoldingModel.bulkWrite(bulkOperations);
      res.status(200).json({
        message: "Wishlist data updated successfully",
        result,
      });
    } catch (error) {
      console.error("Error updating wishlist data:", error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  })
);

module.exports = router;