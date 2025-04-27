require("dotenv").config();
const express = require("express");
const router = express.Router();
const wrapasync = require("../extra/wrapasync");
const Holding = require("../Controller/Holding");

router.get("/allHolding/:id", wrapasync(Holding.getAllHoldings));
router.post("/update-holding", wrapasync(Holding.updateHoldings));

module.exports = router;
