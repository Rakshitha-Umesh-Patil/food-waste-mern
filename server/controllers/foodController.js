const FoodEntry = require("../models/FoodEntry");
const Alert = require("../models/Alert");
const User = require("../models/User"); // ✅ REQUIRED for NGOs
const sendMail = require("../utils/mailer"); // ✅ REQUIRED for email

// =======================
// 1. ADD FOOD ENTRY
// =======================
exports.addFood = async (req, res) => {
  try {
    const { mealType, preparedQty, consumedQty, date } = req.body;

    const userId = req.user._id;

    const prepared = Number(preparedQty);
    const consumed = Number(consumedQty);

    const waste = prepared - consumed;

    const entry = await FoodEntry.create({
      instituteId: userId,
      mealType,
      preparedQty: prepared,
      consumedQty: consumed,
      wasteQty: waste,
      date: date || new Date(),
    });

    // =======================
    // 🚨 ALERT + SOCKET + EMAIL
    // =======================
    if (waste >= 10) {
      const alert = await Alert.create({
        foodEntryId: entry._id,
        instituteId: userId,
        status: "pending",
      });

      // 🔥 SOCKET NOTIFICATION
      const io = req.app.get("io");
      if (io) {
        io.emit("new-alert", {
          _id: alert._id,
          message: "🍱 New food available for pickup",
        });
      }

      // 📩 EMAIL NOTIFICATION (FIXED PART)
      const ngos = await User.find({ role: "ngo" });

      console.log("NGOs found:", ngos.length);

      ngos.forEach(async (ngo) => {
        if (ngo.email) {
          console.log("📧 Sending email to:", ngo.email);

          await sendMail(
            ngo.email,
            "🍱 New Food Available for Pickup",
            `New food is available.\nMeal: ${mealType}\nWaste: ${waste} plates`
          );
        }
      });
    }

    res.status(201).json({
      success: true,
      message: "Food entry added successfully",
      data: entry,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =======================
// 2. GET ALL FOOD ENTRIES
// =======================
exports.getAllFoodEntries = async (req, res) => {
  try {
    const userId = req.user._id;

    const data = await FoodEntry.find({ instituteId: userId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =======================
// 3. GET SINGLE ENTRY
// =======================
exports.getFoodById = async (req, res) => {
  try {
    const userId = req.user._id;

    const entry = await FoodEntry.findOne({
      _id: req.params.id,
      instituteId: userId,
    });

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "Food entry not found",
      });
    }

    res.status(200).json({
      success: true,
      data: entry,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =======================
// 4. UPDATE ENTRY
// =======================
exports.updateFoodEntry = async (req, res) => {
  try {
    const userId = req.user._id;
    const { preparedQty, consumedQty } = req.body;

    let updateData = { ...req.body };

    if (preparedQty !== undefined && consumedQty !== undefined) {
      updateData.wasteQty =
        Number(preparedQty) - Number(consumedQty);
    }

    const updated = await FoodEntry.findOneAndUpdate(
      {
        _id: req.params.id,
        instituteId: userId,
      },
      updateData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Food entry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Food entry updated successfully",
      data: updated,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =======================
// 5. DELETE ENTRY
// =======================
exports.deleteFoodEntry = async (req, res) => {
  try {
    const userId = req.user._id;

    const deleted = await FoodEntry.findOneAndDelete({
      _id: req.params.id,
      instituteId: userId,
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Food entry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Food entry deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};