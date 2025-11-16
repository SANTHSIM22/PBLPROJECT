const express = require("express");
const router = express.Router();
const {
  getAllArtisans,
  updateArtisanProfile,
  addPortfolioImages,
  removePortfolioImage,
  verifyArtisan,
} = require("../controllers/artisan.controller");
const { protect, authorize } = require("../middleware/auth.middleware");

// @route   GET /api/artisans
router.get("/", getAllArtisans);

// @route   PUT /api/artisans/profile
router.put("/profile", protect, authorize("artisan"), updateArtisanProfile);

// @route   POST /api/artisans/portfolio
router.post("/portfolio", protect, authorize("artisan"), addPortfolioImages);

// @route   DELETE /api/artisans/portfolio
router.delete(
  "/portfolio",
  protect,
  authorize("artisan"),
  removePortfolioImage
);

// @route   PUT /api/artisans/:id/verify (Admin only)
router.put("/:id/verify", protect, authorize("admin"), verifyArtisan);

module.exports = router;
