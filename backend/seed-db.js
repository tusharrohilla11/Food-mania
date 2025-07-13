import mongoose from "mongoose";
import foodModel from "./models/foodModel.js";
import "dotenv/config";

const seedData = [
  {
    name: "Greek Salad",
    description: "Fresh vegetables with Greek cheese and olives",
    price: 12,
    category: "Salad",
    image: "food_1.png"
  },
  {
    name: "Veg Salad",
    description: "Fresh mixed vegetables salad",
    price: 18,
    category: "Salad", 
    image: "food_2.png"
  },
  {
    name: "Clover Salad",
    description: "Healthy clover salad with fresh ingredients",
    price: 16,
    category: "Salad",
    image: "food_3.png"
  },
  {
    name: "Chicken Salad",
    description: "Grilled chicken with fresh salad",
    price: 24,
    category: "Salad",
    image: "food_4.png"
  }
];

const seedDatabase = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Check if food items already exist
    const existingFood = await foodModel.find({});
    console.log(`Found ${existingFood.length} existing food items`);

    if (existingFood.length === 0) {
      console.log("Seeding database with sample food items...");
      await foodModel.insertMany(seedData);
      console.log("✅ Database seeded successfully!");
    } else {
      console.log("Database already has food items, skipping seed");
    }

    mongoose.connection.close();
    console.log("Connection closed");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
