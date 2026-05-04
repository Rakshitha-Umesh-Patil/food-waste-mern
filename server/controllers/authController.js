const User = require("../models/User");

// ✅ REGISTER (Institute / NGO)
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, location } = req.body;

    // Basic required checks
    if (!name || !email || !password || !role || !location) {
      return res.status(400).json({ message: "All fields including location are required" });
    }

    // Check existing user
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,     // plain password (as you requested)
      role,
      location,     // for BOTH institute and ngo
    });

    res.status(201).json({
      message: "Registered successfully",
      userId: user._id,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ LOGIN (plain match)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      message: "Login successful",
      userId: user._id,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};