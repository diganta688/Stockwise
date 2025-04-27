const { HoldingModel } = require("../model/Holdings");
const { UserModel } = require("../model/User");

exports.getAllHoldings = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id).populate("holdings");

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
};

exports.updateHoldings = async (req, res) => {
  try {
    const { data } = req.body;

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

    const result = await HoldingModel.bulkWrite(bulkOperations);

    res.status(200).json({
      message: "Holding data updated successfully",
      result,
    });
  } catch (error) {
    console.error("Error updating holding data:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
