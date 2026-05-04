const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema(
  {
    foodEntryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoodEntry",
      required: true,
    },
    instituteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    acceptedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "picked"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// ✅ IMPORTANT: export Mongoose model (NOT schema)
module.exports = mongoose.model("Alert", alertSchema);