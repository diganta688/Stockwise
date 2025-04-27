const yahooFinance = require("yahoo-finance2").default;

exports.Search = async (req, res, next) => {
  let { name } = req.body;
  try {
    const quote = await yahooFinance.quote(name);
    res.status(200).json({ success: true, data: quote });
  } catch (error) {
    console.error("Error fetching stock data:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching stock data" });
  }
};
