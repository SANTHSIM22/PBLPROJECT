const User = require("../models/User.model");

const seedAdmin = async () => {
  try {
    const adminUsername = process.env.ADMIN_USERNAME || "admin";
    const adminEmail = process.env.ADMIN_EMAIL || "admin@artisanconnect.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "Admin@123456";

    console.log("🔍 Checking for admin user...");
    console.log(
      `   Looking for username: ${adminUsername} or email: ${adminEmail}`
    );

    // Check if admin already exists
    const adminExists = await User.findOne({
      $or: [{ email: adminEmail }, { username: adminUsername }],
    });

    if (adminExists) {
      console.log("✅ Admin user already exists");
      console.log(`   Username: ${adminExists.username}`);
      console.log(`   Email: ${adminExists.email}`);
      console.log(`   Role: ${adminExists.role}`);

      // If the existing user is not an admin, update their role
      if (adminExists.role !== "admin") {
        console.log("⚠️  User exists but is not admin. Updating role...");
        adminExists.role = "admin";
        adminExists.emailVerified = true;
        adminExists.isActive = true;
        await adminExists.save();
        console.log("✅ User role updated to admin");
      }
      return;
    }

    // Create admin user
    console.log("📝 Creating new admin user...");
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

    console.log("✅ Admin user created successfully");
    console.log(`   Username: ${admin.username}`);
    console.log(`   Email: ${admin.email}`);
    console.log(`   Password: ${adminPassword}`);
  } catch (error) {
    console.error("❌ Error seeding admin:", error.message);
  }
};

module.exports = seedAdmin;
