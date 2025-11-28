// controllers/transactionController.js
const Transaction = require("../models/Transaction");

// GET /api/transactions?accountId=...
const getTransactions = async (req, res) => {
  try {
    const filter = { user: req.user._id };
    if (req.query.accountId) filter.account = req.query.accountId;

    const transactions = await Transaction.find(filter)
      .populate("account", "name type")
      .sort({ date: -1 });

    res.json(transactions);
  } catch (err) {
    console.error("Get transactions error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/transactions
const createTransaction = async (req, res) => {
  try {
    const { account, type, amount, category, date, note } = req.body;

    if (!account || !type || !amount || !category) {
      return res
        .status(400)
        .json({ message: "account, type, amount, category are required" });
    }

    const tx = await Transaction.create({
      user: req.user._id,
      account,
      type,
      amount,
      category,
      date,
      note,
    });

    res.status(201).json(tx);
  } catch (err) {
    console.error("Create transaction error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/transactions/:id
const updateTransaction = async (req, res) => {
  try {
    const tx = await Transaction.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!tx) return res.status(404).json({ message: "Transaction not found" });

    const fields = ["account", "type", "amount", "category", "date", "note"];
    fields.forEach((field) => {
      if (req.body[field] !== undefined) tx[field] = req.body[field];
    });

    const updated = await tx.save();
    res.json(updated);
  } catch (err) {
    console.error("Update transaction error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/transactions/:id
const deleteTransaction = async (req, res) => {
  try {
    const tx = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!tx) return res.status(404).json({ message: "Transaction not found" });

    res.json({ message: "Transaction removed" });
  } catch (err) {
    console.error("Delete transaction error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
