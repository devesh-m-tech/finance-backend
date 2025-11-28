// controllers/accountController.js
const Account = require("../models/Account");

// GET /api/accounts
const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(accounts);
  } catch (err) {
    console.error("Get accounts error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/accounts
const createAccount = async (req, res) => {
  try {
    const { name, type, balance, currency } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });

    const account = await Account.create({
      user: req.user._id,
      name,
      type,
      balance,
      currency,
    });

    res.status(201).json(account);
  } catch (err) {
    console.error("Create account error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/accounts/:id
const updateAccount = async (req, res) => {
  try {
    const account = await Account.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!account)
      return res.status(404).json({ message: "Account not found" });

    const fields = ["name", "type", "balance", "currency"];
    fields.forEach((field) => {
      if (req.body[field] !== undefined) account[field] = req.body[field];
    });

    const updated = await account.save();
    res.json(updated);
  } catch (err) {
    console.error("Update account error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/accounts/:id
const deleteAccount = async (req, res) => {
  try {
    const account = await Account.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!account)
      return res.status(404).json({ message: "Account not found" });

    res.json({ message: "Account removed" });
  } catch (err) {
    console.error("Delete account error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
};
