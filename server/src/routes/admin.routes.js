const express = require("express");
const router = express.Router();
const {
  getDashboardStats,
  getAllUsersAdmin,
  updateUserStatus,
  deleteUser,
  updateUserRole,
  getAllOrders,
} = require("../controllers/admin.controller");
const { protect, authorize } = require("../middleware/auth.middleware");
const { verifyArtisan } = require("../controllers/artisan.controller");

// All routes require admin role
router.use(protect, authorize("admin"));

// @route   GET /api/admin/stats
router.get("/stats", getDashboardStats);

// @route   GET /api/admin/users
router.get("/users", getAllUsersAdmin);

// @route   GET /api/admin/orders
router.get("/orders", getAllOrders);

// @route   PUT /api/admin/users/:id/status
router.put("/users/:id/status", updateUserStatus);

// @route   PUT /api/admin/users/:id/role
router.put("/users/:id/role", updateUserRole);

// @route   DELETE /api/admin/users/:id
router.delete("/users/:id", deleteUser);

// @route   PUT /api/admin/artisans/:id/verify
router.put("/artisans/:id/verify", verifyArtisan);

module.exports = router;
