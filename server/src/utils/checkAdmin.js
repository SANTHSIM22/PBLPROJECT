const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User.model");

// Load environment variables
dotenv.config();

const checkAndCreateAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/artisan-connect"
    );
    console.log("✅ Connected to MongoDB");

    const adminUsername = process.env.ADMIN_USERNAME || "admin";
    const adminEmail = process.env.ADMIN_EMAIL || "admin@gmail.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin";

    console.log("\n🔍 Searching for admin user...");
    console.log(`   Username: ${adminUsername}`);
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Password: ${adminPassword}`);

    // Find all users with username 'admin' or email matching
    const users = await User.find({
      $or: [{ username: adminUsername }, { email: adminEmail }],
    });

    console.log(`\n📊 Found ${users.length} user(s):`);
    users.forEach((user) => {
      console.log(
        `   - Username: ${user.username}, Email: ${user.email}, Role: ${user.role}`
      );
    });

    // Delete any existing admin user to recreate
    if (users.length > 0) {
      console.log("\n🗑️  Deleting existing users to recreate admin...");
      await User.deleteMany({
        $or: [{ username: adminUsername }, { email: adminEmail }],
      });
      console.log("✅ Deleted existing users");
    }

    // Create fresh admin user
    console.log("\n📝 Creating new admin user...");
    const admin = await User.create({
      username: adminUsername,
      email: adminEmail,
      password: adminPassword,
      role: "admin",
      emailVerified: true,
      isActive: true,
      profile: {
        firstName: "Admin",
        lastName: "User",
        avatar:
          "https://ui-avatars.com/api/?name=Admin&background=8B4513&color=fff",
      },
    });

    console.log("\n✅ Admin user created successfully!");
    console.log(`   ID: ${admin._id}`);
    console.log(`   Username: ${admin.username}`);
    console.log(`   Email: ${admin.email}`);
    console.log(`   Role: ${admin.role}`);
    console.log(`   Active: ${admin.isActive}`);
    console.log("\n🔐 Login Credentials:");
    console.log(`   Username: ${adminUsername}`);
    console.log(`   Password: ${adminPassword}`);

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Error:", error.message);
    process.exit(1);
  }
};

checkAndCreateAdmin();
