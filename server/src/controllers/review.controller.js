const Review = require("../models/Review.model");
const Product = require("../models/Product.model");
const Order = require("../models/Order.model");

// Create review
exports.createReview = async (req, res) => {
  try {
    const { product, productId, rating, comment, images, order } = req.body;
    const actualProductId = product || productId;

    if (!rating || !comment) {
      return res.status(400).json({
        success: false,
        message: "Rating and comment are required",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    // Check if product exists
    const productDoc = await Product.findById(actualProductId);
    if (!productDoc) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check if user has already reviewed this product
    const existingReview = await Review.findOne({
      product: actualProductId,
      customer: req.user._id,
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message:
          "You have already reviewed this product. Please update your existing review.",
      });
    }

    // Check if user has purchased this product
    const hasPurchased = await Order.findOne({
      customer: req.user._id,
      "items.product": actualProductId,
      status: { $in: ["Shipped", "Delivered"] },
    });

    // Create review
    const review = new Review({
      product: actualProductId,
      customer: req.user._id,
      artisan: productDoc.artisan,
      rating,
      comment,
      images: images || [],
      verified: hasPurchased ? true : false,
      order: order || null,
    });

    await review.save();

    // Update product ratings
    const reviews = await Review.find({ product: actualProductId });
    const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = totalRating / reviews.length;

    productDoc.ratings = {
      average: averageRating,
      count: reviews.length,
    };
    await productDoc.save();

    await review.populate("customer", "username profile");

    res.json({
      success: true,
      message: "Review submitted successfully",
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create review",
      error: error.message,
    });
  }
};

// Get reviews for a product
exports.getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const { sort = "recent" } = req.query;

    let sortOption = { createdAt: -1 }; // Recent first

    if (sort === "helpful") {
      sortOption = { helpful: -1 };
    } else if (sort === "rating-high") {
      sortOption = { rating: -1 };
    } else if (sort === "rating-low") {
      sortOption = { rating: 1 };
    }

    const reviews = await Review.find({ product: productId })
      .populate("customer", "username profile")
      .sort(sortOption);

    res.json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
      error: error.message,
    });
  }
};

// Get reviews by artisan
exports.getArtisanReviews = async (req, res) => {
  try {
    const { artisanId } = req.params;

    const reviews = await Review.find({ artisan: artisanId })
      .populate("customer", "username profile")
      .populate("product", "title images")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
      error: error.message,
    });
  }
};

// Update review
exports.updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment, images } = req.body;

    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    // Check if user owns the review
    if (review.customer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this review",
      });
    }

    if (rating) {
      if (rating < 1 || rating > 5) {
        return res.status(400).json({
          success: false,
          message: "Rating must be between 1 and 5",
        });
      }
      review.rating = rating;
    }

    if (comment) review.comment = comment;
    if (images) review.images = images;

    await review.save();

    // Update product ratings
    const reviews = await Review.find({ product: review.product });
    const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = totalRating / reviews.length;

    await Product.findByIdAndUpdate(review.product, {
      ratings: {
        average: averageRating,
        count: reviews.length,
      },
    });

    await review.populate("customer", "username profile");

    res.json({
      success: true,
      message: "Review updated successfully",
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update review",
      error: error.message,
    });
  }
};

// Delete review
exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    // Check if user owns the review or is admin
    if (
      review.customer.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this review",
      });
    }

    const productId = review.product;
    await review.deleteOne();

    // Update product ratings
    const reviews = await Review.find({ product: productId });

    if (reviews.length > 0) {
      const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
      const averageRating = totalRating / reviews.length;

      await Product.findByIdAndUpdate(productId, {
        ratings: {
          average: averageRating,
          count: reviews.length,
        },
      });
    } else {
      await Product.findByIdAndUpdate(productId, {
        ratings: {
          average: 0,
          count: 0,
        },
      });
    }

    res.json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete review",
      error: error.message,
    });
  }
};

// Mark review as helpful
exports.markHelpful = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    review.helpful += 1;
    await review.save();

    res.json({
      success: true,
      message: "Marked as helpful",
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to mark as helpful",
      error: error.message,
    });
  }
};

// Get user's review for a specific product
exports.getMyReview = async (req, res) => {
  try {
    const { productId } = req.params;

    const review = await Review.findOne({
      product: productId,
      customer: req.user._id,
    }).populate("customer", "username profile");

    if (!review) {
      return res.json({
        success: true,
        data: null,
      });
    }

    res.json({
      success: true,
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch review",
      error: error.message,
    });
  }
};
