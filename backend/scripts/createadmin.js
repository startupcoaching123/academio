const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// ✅ Load correct env file
require("dotenv").config({ path: "../.env.prod" });

// ✅ Import Admin model directly (NOT server)
const Admin = require("../models/Admin");

async function createAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Admin details
    const username = "admin"; // Change this to your desired username
    const password = "Shaista@2025"; // Change this to your desired password

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      console.log("❌ Admin already exists. Update the username or remove the existing admin first.");
      return;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new admin
    const admin = new Admin({
      username,
      password: hashedPassword,
    });

    await admin.save();
    console.log("✅ Admin created successfully with username:", username);
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
  } finally {
    mongoose.connection.close();
    console.log("✅ MongoDB connection closed");
  }
}

createAdmin();