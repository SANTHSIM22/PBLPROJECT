const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [30, "Username cannot exceed 30 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // Don't return password by default
    },
    role: {
      type: String,
      enum: ["customer", "artisan", "admin"],
      default: "customer",
    },
    profile: {
      firstName: {
        type: String,
        trim: true,
      },
      lastName: {
        type: String,
        trim: true,
      },
      phone: {
        type: String,
        trim: true,
        match: [
          /^[6-9]\d{9}$/,
          "Please provide a valid Indian phone number (10 digits starting with 6-9)",
        ],
      },
      avatar: {
        type: String,
        default:
          "https://ui-avatars.com/api/?name=User&background=8B4513&color=fff",
        validate: {
          validator: function (v) {
            // Accept http://, https://, or data: URLs
            return !v || /^(https?:\/\/.+|data:image\/.+;base64,.+)/.test(v);
          },
          message: "Avatar must be a valid URL or base64 data URI",
        },
      },
      bio: {
        type: String,
        maxlength: [500, "Bio cannot exceed 500 characters"],
      },
      address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zipCode: String,
      },
    },
    // Artisan-specific fields
    artisanProfile: {
      craftType: {
        type: [String],
        default: [],
      },
      location: {
        type: String,
      },
      portfolioImages: {
        type: [String],
        default: [],
        validate: {
          validator: function (v) {
            // Accept http://, https://, or data: URLs
            return v.every((url) =>
              /^(https?:\/\/.+|data:image\/.+;base64,.+)/.test(url)
            );
          },
          message:
            "All portfolio images must be valid URLs or base64 data URIs",
        },
      },
      isVerified: {
        type: Boolean,
        default: false,
      },
      rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      totalSales: {
        type: Number,
        default: 0,
      },
      earnings: {
        type: Number,
        default: 0,
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Get public profile (exclude sensitive data)
userSchema.methods.getPublicProfile = function () {
  const user = this.toObject();
  delete user.password;

  // Flatten profile fields for easier frontend access
  if (user.profile) {
    user.firstName = user.profile.firstName;
    user.lastName = user.profile.lastName;
    user.phone = user.profile.phone;
    user.avatar = user.profile.avatar;
    user.bio = user.profile.bio;
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
