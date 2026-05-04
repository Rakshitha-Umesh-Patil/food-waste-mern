const mongoose = require("mongoose");

const foodDonationSchema = new mongoose.Schema(
  {
    instituteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    foodType: {
      type: String,
      required: true,
      trim: true,
    },

    quantity: {
      type: String,
      required: true,
      trim: true,
    },

    preparedAt: {
      type: Date,
      required: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["available", "accepted", "picked", "delivered"],
      default: "available",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FoodDonation", foodDonationSchema);