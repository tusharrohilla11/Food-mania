import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

//app config
const app = express();
const port = process.env.PORT || 8000;

//middlewaree
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174", 
    "http://localhost:5175",
    "https://food-mania-frontend-tushar-rohillas-projects.vercel.app", // Add your frontend URL
    "https://food-mania-admin-tushar-rohillas-projects.vercel.app"      // Add your admin URL
  ],
  credentials: true
}));
app.use(express.json());

//DB connection
connectDB();

// API endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads")); //access of uploaded images from uploads folder
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
  });
}

// Export for Vercel serverless deployment
export default app;
