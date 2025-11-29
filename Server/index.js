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

// ⭐ FIX: Allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://bloggerhunt-app.netlify.app"
];

// ⭐ FIX: SIMPLE CORS → No callback version (prevents CORS crash in Windows)
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
}));

// ⭐ FIX: Set headers globally (required for cookies)
app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// Test route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Backend running successfully ✅" });
});

// Routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

// Global error handler
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server Running on PORT ${PORT}`));
