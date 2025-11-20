import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoDB_URL = process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoDB_URL);
    console.log("MongoDB Connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Stop server if DB fails
  }
};

export default connectDB;
