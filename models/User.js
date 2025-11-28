// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // onboarding / quick setup
    currency: { type: String, default: "INR" },
    theme: { type: String, default: "light" }, // "dark" / "light"
    language: { type: String, default: "en" },
    startingBalance: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
