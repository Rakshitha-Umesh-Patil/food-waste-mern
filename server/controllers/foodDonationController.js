const FoodDonation = require("../models/FoodDonation");


// 1. CREATE DONATION
exports.createDonation = async (req, res) => {
  try {
    const { foodType, quantity, preparedAt, location } = req.body;

    const newDonation = new FoodDonation({
      instituteId: req.user.id, // assuming JWT middleware sets req.user
      foodType,
      quantity,
      preparedAt,
      location,
    });

    await newDonation.save();

    res.status(201).json({
      success: true,
      message: "Food donation created successfully",
      data: newDonation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// 2. GET ALL DONATIONS
exports.getAllDonations = async (req, res) => {
  try {
    const donations = await FoodDonation.find()
      .populate("instituteId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: donations.length,
      data: donations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// 3. GET SINGLE DONATION
exports.getDonationById = async (req, res) => {
  try {
    const donation = await FoodDonation.findById(req.params.id)
      .populate("instituteId", "name email");

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found",
      });
    }

    res.status(200).json({
      success: true,
      data: donation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// 4. UPDATE STATUS (IMPORTANT FLOW)
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const donation = await FoodDonation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found",
      });
    }

    donation.status = status;
    await donation.save();

    res.status(200).json({
      success: true,
      message: "Status updated successfully",
      data: donation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// 5. DELETE DONATION (optional)
exports.deleteDonation = async (req, res) => {
  try {
    const donation = await FoodDonation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found",
      });
    }

    await donation.deleteOne();

    res.status(200).json({
      success: true,
      message: "Donation deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};