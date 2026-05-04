const express = require("express");
const router = express.Router();

const {
  createDonation,
  getAllDonations,
  getDonationById,
  updateStatus,
  deleteDonation,
} = require("../controllers/foodDonationController");


// CREATE donation
router.post("/donate", createDonation);

// GET all donations
router.get("/", getAllDonations);

// GET single donation
router.get("/:id", getDonationById);

// UPDATE status (available → accepted → picked → delivered)
router.put("/status/:id", updateStatus);

// DELETE donation
router.delete("/:id", deleteDonation);

module.exports = router;