const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  register,
  login,
  getMe,
  logout,
  changePassword,
} = require("../controllers/auth.controller");
const { protect } = require("../middleware/auth.middleware");

// Validation rules
const registerValidation = [
  body("username")
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username can only contain letters, numbers, and underscores"),
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("phone")
    .optional()
    .matches(/^[6-9]\d{9}$/)
    .withMessage(
      "Please provide a valid Indian phone number (10 digits starting with 6-9)"
    ),
];

// @route   POST /api/auth/register
router.post("/register", registerValidation, register);

// @route   POST /api/auth/login
router.post("/login", login);

// @route   GET /api/auth/me
router.get("/me", protect, getMe);

// @route   POST /api/auth/logout
router.post("/logout", protect, logout);

// @route   PUT /api/auth/change-password
router.put("/change-password", protect, changePassword);

module.exports = router;
