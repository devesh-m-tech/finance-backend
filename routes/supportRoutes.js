// routes/supportRoutes.js
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createTicket,
  getMyTickets,
} = require("../controllers/supportController");

router.post("/", protect, createTicket);
router.get("/", protect, getMyTickets);

module.exports = router;
