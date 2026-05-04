const express = require("express");
const router = express.Router();
const { downloadReport } = require("../controllers/reportController");

// ✅ correct path
router.get("/report/download/:id", downloadReport);

module.exports = router;