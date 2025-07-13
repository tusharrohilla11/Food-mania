const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');
const multer = require('multer');
const fs = require('fs');

const app = express();

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174", 
    "http://localhost:5175",
    "https://food-mania-frontend-tushar-rohillas-projects.vercel.app",
    "https://food-mania-admin-tushar-rohillas-projects.vercel.app"
  ],
  credentials: true
}));
app.use(express.json());

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB connected");
  } catch (err) {
    console.error("DB connection error:", err);
  }
};
connectDB();

// Food Model
const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true }
});
const Food = mongoose.model("food", foodSchema);

// User Model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cartData: { type: Object, default: {} },
  isAdmin: { type: Boolean, default: false }
}, { minimize: false });
const User = mongoose.model("user", userSchema);

// Routes
app.get("/", (req, res) => {
  res.send("API Working");
});

// Get all food items
app.get("/api/food/list", async (req, res) => {
  try {
    const foods = await Food.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
});

// Register user
app.post("/api/user/register", async (req, res) => {
  const { name, password, email } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists!" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter valid email!" });
    }

    if (password.length < 6) {
      return res.json({ success: false, message: "Please enter a strong password!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const isAdmin = email === "tusharrohilla1121@gmail.com";
    
    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
      isAdmin: isAdmin,
    });

    const user = await newUser.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
});

// Login user
app.post("/api/user/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
});

module.exports = app;
