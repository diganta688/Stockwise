const express = require("express");
const router = express.Router();
const Search = require("../Controller/Search");

router.post("/search-stock", Search.Search);

module.exports = router;
