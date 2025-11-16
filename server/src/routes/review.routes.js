const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/review.controller");
const { protect } = require("../middleware/auth.middleware");

router.get("/product/:productId", reviewController.getProductReviews);
router.get("/artisan/:artisanId", reviewController.getArtisanReviews);

// Protected routes
router.use(protect);

router.get("/product/:productId/my-review", reviewController.getMyReview);
router.post("/", reviewController.createReview);
router.put("/:id", reviewController.updateReview);
router.delete("/:id", reviewController.deleteReview);
router.post("/:id/helpful", reviewController.markHelpful);

module.exports = router;
