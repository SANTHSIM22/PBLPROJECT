const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    artisan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      maxLength: 1000,
    },
    images: [
      {
        type: String,
        validate: {
          validator: function (v) {
            return /^(https?:\/\/.+|data:image\/.+;base64,.+)/.test(v);
          },
          message: "Image must be a valid URL or data URI",
        },
      },
    ],
    helpful: {
      type: Number,
      default: 0,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate reviews from same customer for same product
reviewSchema.index({ product: 1, customer: 1 }, { unique: true });

module.exports = mongoose.model("Review", reviewSchema);
