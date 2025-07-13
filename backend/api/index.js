const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');

const app = express();

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174", 
    "http://localhost:5175",
    "https://food-mania-henna.vercel.app",
    "https://food-mania-admin-nine.vercel.app",
    "https://food-mania-frontend-tushar-rohillas-projects.vercel.app",
    "https://food-mania-admin-tushar-rohillas-projects.vercel.app"
  ],
  credentials: true
}));
app.use(express.json());

// MongoDB connection with connection pooling for serverless
let cachedConnection = null;
const connectDB = async () => {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 1, // Serverless functions work better with smaller pools
    });
    cachedConnection = connection;
    console.log("DB connected");
    return connection;
  } catch (err) {
    console.error("DB connection error:", err);
    throw err;
  }
};

// User Model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cartData: { type: Object, default: {} },
  isAdmin: { type: Boolean, default: false }
}, { minimize: false });

const User = mongoose.models.user || mongoose.model("user", userSchema);

// Food Model  
const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true }
});

const Food = mongoose.models.food || mongoose.model("food", foodSchema);

// Routes
app.get("/", async (req, res) => {
  try {
    await connectDB();
    res.json({ message: "FoodMania API Working Successfully!", status: "success", database: "connected" });
  } catch (error) {
    res.json({ message: "API Working but DB connection failed", status: "error", error: error.message });
  }
});

// Get all food items
app.get("/api/food/list", async (req, res) => {
  try {
    await connectDB();
    const foods = await Food.find({});
    console.log(`Found ${foods.length} food items`);
    res.json({ success: true, data: foods });
  } catch (error) {
    console.error("Error fetching food items:", error);
    res.json({ success: false, message: "Error fetching food items", error: error.message });
  }
});

// Register user
app.post("/api/user/register", async (req, res) => {
  const { name, password, email } = req.body;
  
  try {
    await connectDB();
    
    console.log("Registration attempt for:", email);
    
    // Check if user exists
    const exists = await User.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists!" });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter valid email!" });
    }

    // Check password length
    if (password.length < 6) {
      return res.json({ success: false, message: "Please enter a strong password!" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Check if admin
    const isAdmin = email === "tusharrohilla1121@gmail.com";
    
    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
      isAdmin: isAdmin,
    });

    const user = await newUser.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    
    console.log("User registered successfully:", email, "Admin:", isAdmin);
    res.json({ success: true, token, message: "Registration successful!" });
    
  } catch (error) {
    console.error("Registration error:", error);
    res.json({ success: false, message: "Registration failed", error: error.message });
  }
});

// Login user
app.post("/api/user/login", async (req, res) => {
  const { email, password } = req.body;
  
  try {
    await connectDB();
    
    console.log("Login attempt for:", email);
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    
    console.log("Login successful for:", email);
    res.json({ success: true, token, message: "Login successful!" });
    
  } catch (error) {
    console.error("Login error:", error);
    res.json({ success: false, message: "Login failed", error: error.message });
  }
});

// Handle all other routes
app.use("*", (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: "Route not found", 
    availableRoutes: [
      "GET /",
      "GET /api/food/list", 
      "POST /api/user/register",
      "POST /api/user/login"
    ]
  });
});

module.exports = app;
