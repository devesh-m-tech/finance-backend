// routes/liabilityRoutes.js
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getLiabilities,
  createLiability,
  updateLiability,
  deleteLiability,
} = require("../controllers/liabilityController");

router.get("/", protect, getLiabilities);
router.post("/", protect, createLiability);
router.put("/:id", protect, updateLiability);
router.delete("/:id", protect, deleteLiability);

module.exports = router;
