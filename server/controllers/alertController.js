const Alert = require("../models/Alert");

// ✅ 1. Get alerts for NGO dashboard
exports.getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find()
      .populate("instituteId", "name")
      .populate("foodEntryId", "mealType wasteQty date")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: alerts,   // 🔥 send full populated objects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ 2. NGO accepts alert
exports.acceptAlert = async (req, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(
      req.params.id,                 // ⭐ from URL
      {
        status: "accepted",
        acceptedBy: req.user._id,   // ⭐ from session
      },
      { new: true }
    );

    res.json({
      success: true,
      message: "Alert accepted",
      data: alert,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ 3. Mark as picked
exports.markPicked = async (req, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(
      req.params.id,      // ⭐ from URL
      { status: "picked" },
      { new: true }
    );

    res.json({
      success: true,
      message: "Food picked up",
      data: alert,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};