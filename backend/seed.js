const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
require("dotenv").config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected for seeding");
    seedAdmin();
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });

const seedAdmin = async () => {
  try {
    // Check if admin exists
    const adminExists = await User.findOne({ userId: "adm" });
    if (adminExists) {
      console.log("Admin already exists");
      return process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("adm", 10);

    // Create admin
    const admin = new User({
      userId: "adm",
      password: hashedPassword,
      role: "admin",
      name: "Admin User",
    });

    await admin.save();
    console.log("Default admin created");
    process.exit(0);
  } catch (err) {
    console.log("Error seeding admin:", err);
    process.exit(1);
  }
};