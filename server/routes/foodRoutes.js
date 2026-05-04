const express = require("express");
const router = express.Router();

const foodController = require("../controllers/foodController");
const sessionAuth = require("../middleware/sessionAuth");

// 🔐 CREATE food entry
router.post("/", sessionAuth, foodController.addFood);

// 📋 GET all entries
router.get("/", sessionAuth, foodController.getAllFoodEntries);

// 🔍 GET single entry
router.get("/:id", sessionAuth, foodController.getFoodById);

// ✏️ UPDATE entry
router.put("/:id", sessionAuth, foodController.updateFoodEntry);

// ❌ DELETE entry
router.delete("/:id", sessionAuth, foodController.deleteFoodEntry);

module.exports = router;