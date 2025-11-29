import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from './Routes/userRoute.js';
import authRoutes from './Routes/authRoute.js';
import commentRoutes from './Routes/commentRoute.js';
import postRoutes from './Routes/postRoute.js';
import connectDB from "./Database/config.js";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());

// Allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://bloggerhunt-app.netlify.app"
];

// 🔵 NORMAL CORS
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 🔵 FIX FOR EXPRESS 5 — SAFE OPTIONS HANDLER (NO "*" ROUTE)
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return res.sendStatus(200);
  }
  next();
});

// ROUTES
app.get("/", (req, res) => {
  res.status(200).json({ message: "Backend running successfully ✅" });
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const msg = err.message || "Internal Server Error";
  res.status(status).json({ success: false, status, msg });
});

// SERVER START
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server Running on PORT ${PORT}`));
