const Product = require("../models/Product.model");
const User = require("../models/User.model");

// @desc    Create a new product
// @route   POST /api/products
// @access  Private (Artisan only)
exports.createProduct = async (req, res) => {
  try {
    const productData = {
      ...req.body,
      artisan: req.user._id,
    };

    const product = await Product.create(productData);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating product",
      error: error.message,
    });
  }
};

// @desc    Get all products (with filters)
// @route   GET /api/products
// @access  Public
exports.getAllProducts = async (req, res) => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      search,
      artisan,
      isAvailable,
      page = 1,
      limit = 12,
      sort = "-createdAt",
    } = req.query;

    const query = { isActive: true };

    if (category) query.category = category;
    if (artisan) query.artisan = artisan;
    if (isAvailable !== undefined) query.isAvailable = isAvailable === "true";
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (search) {
      query.$text = { $search: search };
    }

    const skip = (Number(page) - 1) * Number(limit);

    const products = await Product.find(query)
      .populate(
        "artisan",
        "username profile.firstName profile.lastName profile.avatar"
      )
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        products,
        pagination: {
          total,
          page: Number(page),
          pages: Math.ceil(total / Number(limit)),
        },
      },
    });
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "artisan",
      "username profile.firstName profile.lastName profile.avatar profile.bio artisanProfile"
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Get product error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching product",
      error: error.message,
    });
  }
};

// @desc    Get products by artisan
// @route   GET /api/products/artisan/:artisanId
// @access  Public
exports.getProductsByArtisan = async (req, res) => {
  try {
    const products = await Product.find({
      artisan: req.params.artisanId,
      isActive: true,
    }).sort("-createdAt");

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Get artisan products error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching artisan products",
      error: error.message,
    });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (Artisan - own products only)
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check if user is the artisan who created this product
    if (
      product.artisan.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this product",
      });
    }

    // Update product fields
    Object.keys(req.body).forEach((key) => {
      product[key] = req.body[key];
    });

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating product",
      error: error.message,
    });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private (Artisan - own products only)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check if user is the artisan who created this product
    if (
      product.artisan.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this product",
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting product",
      error: error.message,
    });
  }
};

// @desc    Get my products (artisan's own products)
// @route   GET /api/products/my-products
// @access  Private (Artisan only)
exports.getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ artisan: req.user._id }).sort(
      "-createdAt"
    );

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Get my products error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
};
