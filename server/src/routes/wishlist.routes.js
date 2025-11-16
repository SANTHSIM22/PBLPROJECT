const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlist.controller");
const { protect } = require("../middleware/auth.middleware");

// All routes require authentication
router.use(protect);

router.get("/", wishlistController.getWishlist);
router.post("/add", wishlistController.addToWishlist);
router.post("/toggle", wishlistController.toggleWishlist);
router.delete("/remove/:productId", wishlistController.removeFromWishlist);
router.get("/check/:productId", wishlistController.checkWishlist);

module.exports = router;
