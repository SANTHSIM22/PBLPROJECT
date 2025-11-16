const User = require("../models/User.model");

// @desc    Get all artisans
// @route   GET /api/artisans
// @access  Public
exports.getAllArtisans = async (req, res) => {
  try {
    const { craftType, location, verified, page = 1, limit = 12 } = req.query;

    const query = { role: "artisan" };

    if (craftType) {
      query["artisanProfile.craftType"] = { $in: [craftType] };
    }

    if (location) {
      query["artisanProfile.location"] = new RegExp(location, "i");
    }

    if (verified !== undefined) {
      query["artisanProfile.isVerified"] = verified === "true";
    }

    const artisans = await User.find(query)
      .select("-password")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ "artisanProfile.rating": -1, createdAt: -1 });

    const count = await User.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        artisans,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        totalArtisans: count,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching artisans",
      error: error.message,
    });
  }
};

// @desc    Update artisan profile
// @route   PUT /api/artisans/profile
// @access  Private (Artisan only)
exports.updateArtisanProfile = async (req, res) => {
  try {
    const { craftType, location, bio } = req.body;

    const user = await User.findById(req.user._id);

    if (!user || user.role !== "artisan") {
      return res.status(403).json({
        success: false,
        message: "Only artisans can update artisan profile",
      });
    }

    // Update artisan fields
    if (craftType !== undefined) user.artisanProfile.craftType = craftType;
    if (location !== undefined) user.artisanProfile.location = location;
    if (bio !== undefined) user.profile.bio = bio;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Artisan profile updated successfully",
      data: {
        user: user.getPublicProfile(),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating artisan profile",
      error: error.message,
    });
  }
};

// @desc    Add portfolio image URLs
// @route   POST /api/artisans/portfolio
// @access  Private (Artisan only)
exports.addPortfolioImages = async (req, res) => {
  try {
    const { imageUrls } = req.body;

    if (!imageUrls || !Array.isArray(imageUrls) || imageUrls.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least one image URL",
      });
    }

    // Validate all URLs
    const urlRegex = /^https?:\/\/.+/;
    const invalidUrls = imageUrls.filter((url) => !urlRegex.test(url));

    if (invalidUrls.length > 0) {
      return res.status(400).json({
        success: false,
        message: "All image URLs must be valid",
        invalidUrls,
      });
    }

    const user = await User.findById(req.user._id);

    if (!user || user.role !== "artisan") {
      return res.status(403).json({
        success: false,
        message: "Only artisans can add portfolio images",
      });
    }

    // Add new portfolio images
    user.artisanProfile.portfolioImages.push(...imageUrls);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Portfolio images added successfully",
      data: {
        portfolioImages: user.artisanProfile.portfolioImages,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding portfolio images",
      error: error.message,
    });
  }
};

// @desc    Remove portfolio image URL
// @route   DELETE /api/artisans/portfolio
// @access  Private (Artisan only)
exports.removePortfolioImage = async (req, res) => {
  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Please provide an image URL to remove",
      });
    }

    const user = await User.findById(req.user._id);

    if (!user || user.role !== "artisan") {
      return res.status(403).json({
        success: false,
        message: "Only artisans can remove portfolio images",
      });
    }

    // Remove the image URL
    user.artisanProfile.portfolioImages =
      user.artisanProfile.portfolioImages.filter((img) => img !== imageUrl);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Portfolio image removed successfully",
      data: {
        portfolioImages: user.artisanProfile.portfolioImages,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error removing portfolio image",
      error: error.message,
    });
  }
};

// @desc    Verify artisan (Admin only)
// @route   PUT /api/artisans/:id/verify
// @access  Private/Admin
exports.verifyArtisan = async (req, res) => {
  try {
    const { isVerified } = req.body;

    const artisan = await User.findById(req.params.id);

    if (!artisan || artisan.role !== "artisan") {
      return res.status(404).json({
        success: false,
        message: "Artisan not found",
      });
    }

    artisan.artisanProfile.isVerified = isVerified;
    await artisan.save();

    res.status(200).json({
      success: true,
      message: `Artisan ${isVerified ? "verified" : "unverified"} successfully`,
      data: {
        artisan: artisan.getPublicProfile(),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error verifying artisan",
      error: error.message,
    });
  }
};
