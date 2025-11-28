// controllers/supportController.js
const SupportTicket = require("../models/SupportTicket");

// POST /api/support
const createTicket = async (req, res) => {
  try {
    const { subject, message } = req.body;
    if (!subject || !message)
      return res
        .status(400)
        .json({ message: "subject and message are required" });

    const ticket = await SupportTicket.create({
      user: req.user._id,
      subject,
      message,
    });

    res.status(201).json(ticket);
  } catch (err) {
    console.error("Create ticket error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/support
const getMyTickets = async (req, res) => {
  try {
    const tickets = await SupportTicket.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(tickets);
  } catch (err) {
    console.error("Get tickets error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createTicket, getMyTickets };
