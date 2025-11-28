// controllers/userController.js
const User = require("../models/User");

// GET /api/users/me
const getMe = async (req, res) => {
  res.json(req.user);
};

// PUT /api/users/settings
const updateSettings = async (req, res) => {
  try {
    const { currency, theme, language, startingBalance, name } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (currency) user.currency = currency;
    if (theme) user.theme = theme;
    if (language) user.language = language;
    if (startingBalance !== undefined) user.startingBalance = startingBalance;
    if (name) user.name = name;

    const updated = await user.save();
    res.json({
      _id: updated._id,
      name: updated.name,
      email: updated.email,
      currency: updated.currency,
      theme: updated.theme,
      language: updated.language,
      startingBalance: updated.startingBalance,
    });
  } catch (err) {
    console.error("Update settings error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getMe, updateSettings };
