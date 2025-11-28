// routes/accountRoutes.js
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
} = require("../controllers/accountController");

router.get("/", protect, getAccounts);
router.post("/", protect, createAccount);
router.put("/:id", protect, updateAccount);
router.delete("/:id", protect, deleteAccount);

module.exports = router;
