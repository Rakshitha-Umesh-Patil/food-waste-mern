const User = require("../models/User");

const sessionAuth = async (req, res, next) => {
  try {
    // Accept both cases just in case frontend differs
    const userId = req.headers.userid || req.headers.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "No userId sent in headers",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid user",
      });
    }

    // attach user to request
    req.user = user;

    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = sessionAuth;