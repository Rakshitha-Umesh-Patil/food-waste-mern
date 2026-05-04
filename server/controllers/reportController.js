const PDFDocument = require("pdfkit");
const mongoose = require("mongoose");
const Food = require("../models/foodEntry");

exports.downloadReport = async (req, res) => {
  try {
    // ✅ CHANGED HERE
    const instituteId = req.params.id;
    if (!instituteId) {
      return res.status(400).json({ message: "Institute ID missing" });
    }

    // ✅ validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(instituteId)) {
      return res.status(400).json({ message: "Invalid Institute ID" });
    }

    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - 30);

    const foods = await Food.find({
      instituteId: instituteId,
      date: { $gte: fromDate },
    }).sort({ date: 1 });

    if (!foods.length) {
      return res.status(404).json({
        message: "No food data for last 30 days",
      });
    }

    let totalPrepared = 0;
    let totalConsumed = 0;
    let totalWaste = 0;

    foods.forEach((f) => {
      totalPrepared += f.preparedQty;
      totalConsumed += f.consumedQty;
      totalWaste += f.wasteQty;
    });

    const wastePercent =
      totalPrepared > 0
        ? ((totalWaste / totalPrepared) * 100).toFixed(2)
        : 0;

    const doc = new PDFDocument({ margin: 40 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Monthly_Report.pdf"
    );

    doc.pipe(res);

    doc.fontSize(22).text("Monthly Food Waste Report", { align: "center" });
    doc.moveDown(2);

    doc.fontSize(14).text(`Total Prepared: ${totalPrepared}`);
    doc.text(`Total Consumed: ${totalConsumed}`);
    doc.text(`Total Wasted: ${totalWaste}`);
    doc.text(`Waste %: ${wastePercent}%`);
    doc.moveDown(2);

    foods.forEach((f, i) => {
      doc.text(
        `${i + 1}. ${new Date(f.date).toLocaleDateString()} | ${
          f.mealType
        } | P:${f.preparedQty} C:${f.consumedQty} W:${f.wasteQty}`
      );
    });

    doc.end();
  } catch (err) {
    console.error("PDF ERROR FULL:", err);
    return res.status(500).json({ message: "Error generating report" });
  }
};