const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB connection error:", err));
// Import required modules
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");

// Login API
app.post("/login", async (req, res) => {
    try {
        // Get user input
        const { userId, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ userId });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.userId, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Send response with role
        res.status(200).json({ token, role: user.role });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Membership API
app.post("/memberships", async (req, res) => {
    try {
        // Validate admin role using JWT middleware (you'll need to implement this)
        const { firstName, lastName, contact, duration } = req.body;

        // Calculate start/end dates (example logic)
        const startDate = new Date();
        const endDate = new Date();
        endDate.setMonth(startDate.getMonth() + (duration === "six-months" ? 6 : duration === "one-year" ? 12 : 24));

        const newMembership = new Membership({
            firstName,
            lastName,
            contact,
            startDate,
            endDate,
            status: "active"
        });

        await newMembership.save();
        res.status(201).json(newMembership);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Update membership
app.put("/memberships/:id", async (req, res) => {
    try {
      const { duration, remove } = req.body;
      const membership = await Membership.findById(req.params.id);
  
      if (remove) {
        membership.status = "inactive";
      } else {
        const newEndDate = new Date(membership.endDate);
        newEndDate.setMonth(newEndDate.getMonth() + (
          duration === "six-months" ? 6 : duration === "one-year" ? 12 : 24
        ));
        membership.endDate = newEndDate;
      }
  
      await membership.save();
      res.json(membership);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  });
// Test route
app.get("/", (req, res) => {
    res.send("Library Management Backend");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});