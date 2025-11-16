const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  updateProfile,
  updateAvatar,
  deleteAccount,
  getAllUsers,
} = require("../controllers/user.controller");
const { protect, authorize } = require("../middleware/auth.middleware");

// @route   GET /api/users/profile/:id
router.get("/profile/:id", getUserProfile);

// @route   PUT /api/users/profile
router.put("/profile", protect, updateProfile);

// @route   PUT /api/users/avatar
router.put("/avatar", protect, updateAvatar);

// @route   DELETE /api/users/account
router.delete("/account", protect, deleteAccount);

// @route   GET /api/users (Admin only)
router.get("/", protect, authorize("admin"), getAllUsers);

module.exports = router;
