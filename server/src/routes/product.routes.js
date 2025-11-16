const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  getProductsByArtisan,
  updateProduct,
  deleteProduct,
  getMyProducts,
} = require("../controllers/product.controller");
const { protect, authorize } = require("../middleware/auth.middleware");

// Protected routes (Artisan only) - Must come before /:id
router.get("/my/products", protect, authorize("artisan"), getMyProducts);
router.post("/", protect, authorize("artisan", "admin"), createProduct);
router.put("/:id", protect, authorize("artisan", "admin"), updateProduct);
router.delete("/:id", protect, authorize("artisan", "admin"), deleteProduct);

// Public routes with params (Must come after specific routes)
router.get("/", getAllProducts);
router.get("/artisan/:artisanId", getProductsByArtisan);
router.get("/:id", getProductById);

module.exports = router;
