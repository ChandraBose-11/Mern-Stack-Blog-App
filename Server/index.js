import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./Routes/userRoute.js";
import authRoutes from "./Routes/authRoute.js";
import commentRoutes from "./Routes/commentRoute.js";
import postRoutes from "./Routes/postRoute.js";
import connectDB from "./Database/config.js";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());

// --------------------------------------------------------
// CORS CONFIG (WORKS WITH NETLIFY + RENDER)
// --------------------------------------------------------
const allowedOrigins = [
  "http://localhost:5173",
  "https://bloggerhunt-app.netlify.app"
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// Pre-flight handling (important for fetch + cookies)
app.options("*", cors({
  origin: allowedOrigins,
  credentials: true
}));

// --------------------------------------------------------
app.get("/", (req, res) => {
  res.status(200).json({ message: "Backend is running successfully 🚀" });
});

// --------------------------------------------------------
// API ROUTES
// --------------------------------------------------------
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

// --------------------------------------------------------
// GLOBAL ERROR HANDLER
// --------------------------------------------------------
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    status,
    msg: err.message || "Internal server error"
  });
});

// --------------------------------------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server Running on PORT ${PORT}`));
