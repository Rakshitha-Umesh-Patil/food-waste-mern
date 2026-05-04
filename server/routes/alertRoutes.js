const express = require("express");
const router = express.Router();

const alertController = require("../controllers/alertController");
const sessionAuth = require("../middleware/sessionAuth");

// Get alerts (NGO sees pending alerts)
router.get("/myalerts", sessionAuth, alertController.getAlerts);

// NGO accepts an alert
router.post("/accept", sessionAuth, alertController.acceptAlert);

// Mark food as picked up
router.post("/picked", sessionAuth, alertController.markPicked);

module.exports = router;