const nodemailer = require("nodemailer");

// create transporter (Gmail SMTP - stable config)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  // 🔥 FIX: avoids certificate issues in local/dev
  tls: {
    rejectUnauthorized: false,
  },
});

// reusable send function
const sendMail = async (to, subject, text) => {
  try {
    if (!to) throw new Error("Recipient email is missing");

    const mailOptions = {
      from: `"Food Waste System 🍱" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("📩 Email sent:", info.response);

    return info;
  } catch (error) {
    console.log("❌ Email error:", error.message);
    return null;
  }
};

module.exports = sendMail;