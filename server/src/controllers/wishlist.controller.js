const Wishlist = require("../models/Wishlist.model");
const Product = require("../models/Product.model");

// Get user's wishlist
exports.getWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id }).populate({
      path: "products",
      populate: {
        path: "artisan",
        select: "username profile",
      },
    });

    if (!wishlist) {
      wishlist = { products: [] };
    }

    res.json({
      success: true,
      data: wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch wishlist",
      error: error.message,
    });
  }
};

// Add product to wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      wishlist = new Wishlist({
        user: req.user._id,
        products: [productId],
      });
    } else {
      // Check if already in wishlist
      if (wishlist.products.includes(productId)) {
        return res.status(400).json({
          success: false,
          message: "Product already in wishlist",
        });
      }
      wishlist.products.push(productId);
    }

    await wishlist.save();
    await wishlist.populate({
      path: "products",
      populate: {
        path: "artisan",
        select: "username profile",
      },
    });

    res.json({
      success: true,
      message: "Product added to wishlist",
      data: wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add to wishlist",
      error: error.message,
    });
  }
};

// Remove product from wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found",
      });
    }

    wishlist.products = wishlist.products.filter(
      (p) => p.toString() !== productId
    );

    await wishlist.save();
    await wishlist.populate({
      path: "products",
      populate: {
        path: "artisan",
        select: "username profile",
      },
    });

    res.json({
      success: true,
      message: "Product removed from wishlist",
      data: wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to remove from wishlist",
      error: error.message,
    });
  }
};

// Toggle wishlist (add if not present, remove if present)
exports.toggleWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      wishlist = new Wishlist({
        user: req.user._id,
        products: [productId],
      });
      await wishlist.save();

      await wishlist.populate({
        path: "products",
        populate: {
          path: "artisan",
          select: "username profile",
        },
      });

      return res.json({
        success: true,
        message: "Product added to wishlist",
        data: wishlist,
        inWishlist: true,
      });
    }

    const index = wishlist.products.indexOf(productId);

    if (index > -1) {
      // Remove from wishlist
      wishlist.products.splice(index, 1);
      await wishlist.save();

      await wishlist.populate({
        path: "products",
        populate: {
          path: "artisan",
          select: "username profile",
        },
      });

      return res.json({
        success: true,
        message: "Product removed from wishlist",
        data: wishlist,
        inWishlist: false,
      });
    } else {
      // Add to wishlist
      wishlist.products.push(productId);
      await wishlist.save();

      await wishlist.populate({
        path: "products",
        populate: {
          path: "artisan",
          select: "username profile",
        },
      });

      return res.json({
        success: true,
        message: "Product added to wishlist",
        data: wishlist,
        inWishlist: true,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to toggle wishlist",
      error: error.message,
    });
  }
};

// Check if product is in wishlist
exports.checkWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const wishlist = await Wishlist.findOne({ user: req.user._id });

    const inWishlist = wishlist && wishlist.products.includes(productId);

    res.json({
      success: true,
      data: { inWishlist },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to check wishlist",
      error: error.message,
    });
  }
};
