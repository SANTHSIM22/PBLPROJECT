const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    artisan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "pottery",
        "textiles",
        "jewelry",
        "woodwork",
        "metalwork",
        "paintings",
        "sculptures",
        "handicrafts",
        "other",
      ],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    images: [
      {
        type: String,
        validate: {
          validator: function (v) {
            // Accept http://, https://, or data: URLs
            return /^(https?:\/\/.+|data:image\/.+;base64,.+)/.test(v);
          },
          message: "Image must be a valid URL or base64 data URI",
        },
      },
    ],
    videos: [
      {
        type: String,
        validate: {
          validator: function (v) {
            // Accept http://, https://, or data: URLs
            return /^(https?:\/\/.+|data:video\/.+;base64,.+)/.test(v);
          },
          message: "Video must be a valid URL or base64 data URI",
        },
      },
    ],
    materials: {
      type: String,
      maxlength: [500, "Materials description cannot exceed 500 characters"],
    },
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
      unit: {
        type: String,
        enum: ["cm", "inch", "meter"],
        default: "cm",
      },
    },
    weight: {
      value: Number,
      unit: {
        type: String,
        enum: ["g", "kg", "lb"],
        default: "kg",
      },
    },
    stock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    customizable: {
      type: Boolean,
      default: false,
    },
    customizationOptions: {
      type: String,
      maxlength: [500, "Customization options cannot exceed 500 characters"],
    },
    storyVideo: {
      type: String,
      validate: {
        validator: function (v) {
          // Accept http://, https://, data: URLs, or empty
          return !v || /^(https?:\/\/.+|data:video\/.+;base64,.+)/.test(v);
        },
        message: "Story video must be a valid URL or base64 data URI",
      },
    },
    storyDescription: {
      type: String,
      maxlength: [1000, "Story description cannot exceed 1000 characters"],
    },
    ratings: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    totalSales: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for search and filtering
productSchema.index({ artisan: 1, isActive: 1 });
productSchema.index({ category: 1, isActive: 1 });
productSchema.index({ title: "text", description: "text" });

module.exports = mongoose.model("Product", productSchema);
