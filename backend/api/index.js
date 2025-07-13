import express from "express";
import cors from "cors";
import { connectDB } from "../config/db.js";
import foodRouter from "../routes/foodRoute.js";
import userRouter from "../routes/userRoute.js";
import "dotenv/config";
import cartRouter from "../routes/cartRoute.js";
import orderRouter from "../routes/orderRoute.js";

//app config
const app = express();

//middlewaree
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174", 
    "http://localhost:5175",
    "https://food-mania-henna.vercel.app",
    "https://food-mania-admin-nine.vercel.app",
    
  ],
  credentials: true
}));
app.use(express.json());

//DB connection
connectDB();

// API endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

// Export the Express API
export default app;
