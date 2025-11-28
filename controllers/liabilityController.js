// controllers/liabilityController.js
const Liability = require("../models/Liability");

// GET /api/liabilities
const getLiabilities = async (req, res) => {
  try {
    const list = await Liability.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(list);
  } catch (err) {
    console.error("Get liabilities error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/liabilities
const createLiability = async (req, res) => {
  try {
    const {
      type,
      name,
      lender,
      principal,
      interest,
      tenure,
      emi,
      startDate,
      statementDay,
      dueDay,
      notes,
    } = req.body;

    if (!type || !name || principal === undefined || principal === null) {
      return res
        .status(400)
        .json({ message: "type, name and principal are required" });
    }

    const liab = await Liability.create({
      user: req.user._id,
      type,
      name,
      lender,
      principal,
      interest,
      tenure,
      emi,
      startDate,
      statementDay,
      dueDay,
      notes,
    });

    res.status(201).json(liab);
  } catch (err) {
    console.error("Create liability error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/liabilities/:id
const updateLiability = async (req, res) => {
  try {
    const liab = await Liability.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!liab) return res.status(404).json({ message: "Liability not found" });

    const fields = [
      "type",
      "name",
      "lender",
      "principal",
      "interest",
      "tenure",
      "emi",
      "startDate",
      "statementDay",
      "dueDay",
      "notes",
    ];

    fields.forEach((f) => {
      if (req.body[f] !== undefined) liab[f] = req.body[f];
    });

    const updated = await liab.save();
    res.json(updated);
  } catch (err) {
    console.error("Update liability error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/liabilities/:id
const deleteLiability = async (req, res) => {
  try {
    const liab = await Liability.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!liab) return res.status(404).json({ message: "Liability not found" });

    res.json({ message: "Liability removed" });
  } catch (err) {
    console.error("Delete liability error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getLiabilities,
  createLiability,
  updateLiability,
  deleteLiability,
};
