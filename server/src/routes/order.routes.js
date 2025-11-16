const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");
const { protect } = require("../middleware/auth.middleware");

// All routes require authentication
router.use(protect);

router.post("/checkout", orderController.createOrder);
router.get("/customer", orderController.getCustomerOrders);
router.get("/artisan", orderController.getArtisanOrders);
router.get("/:id", orderController.getOrder);
router.put("/:id/status", orderController.updateOrderStatus);
router.put("/:id/cancel", orderController.cancelOrder);

module.exports = router;
