const express = require("express");
const router = express.Router();
const RevenueController = require("../controllers/RevenueController");

router.get("/", RevenueController.getRevenue);

module.exports = router;
