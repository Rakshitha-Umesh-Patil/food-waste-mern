const mongoose = require("mongoose");

const foodEntrySchema = new mongoose.Schema(
  {
    instituteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    mealType: {
      type: String,
      required: true,
      enum: ["Breakfast", "Lunch", "Dinner"],
    },

    preparedQty: {
      type: Number,
      required: true,
    },

    consumedQty: {
      type: Number,
      required: true,
    },

    wasteQty: {
      type: Number,
      required: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FoodEntry", foodEntrySchema);