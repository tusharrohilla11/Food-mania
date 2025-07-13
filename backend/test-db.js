import mongoose from "mongoose";
import "dotenv/config";

const testConnection = async () => {
  try {
    console.log("Testing MongoDB connection...");
    console.log("MONGODB_URI:", process.env.MONGODB_URI ? "Set" : "Not set");
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Database connected successfully!");
    
    // Test if we can access the database
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("Available collections:", collections.map(c => c.name));
    
    mongoose.connection.close();
    console.log("Connection closed.");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};

testConnection();
