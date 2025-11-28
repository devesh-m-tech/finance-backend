// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const User = require("../models/User");

// GET /api/users/me  -> current user
router.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      name: user.name,
      email: user.email,
      currency: user.currency,
      theme: user.theme,
      language: user.language,
      startingBalance: user.startingBalance,
    });
  } catch (err) {
    console.error("Get me error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/users/settings  -> update name/email/theme/currency etc.
router.put("/settings", protect, async (req, res) => {
  try {
    const allowedFields = ["name", "email", "currency", "theme", "language"];
    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const updated = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
    }).select("-password");

    if (!updated) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Settings updated",
      name: updated.name,
      email: updated.email,
      currency: updated.currency,
      theme: updated.theme,
      language: updated.language,
    });
  } catch (err) {
    console.error("Update settings error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/users/delete  -> delete account
router.delete("/delete", protect, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({ message: "Account deleted successfully" });
  } catch (err) {
    console.error("Delete user error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
