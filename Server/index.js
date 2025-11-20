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

// In production, set `CLIENT_URL` (Netlify URL) on Render and allow credentials.
const CLIENT_URL = process.env.CLIENT_URL || "*";
app.use(cors({
  origin: CLIENT_URL,
  credentials: CLIENT_URL !== "*",
}));
app.get("/", (req, res) => {
  res.status(200).json({ message: "Backend running successfully ✅" });
});

// ROUTES
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);




// global error handler
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const msg = err.message || "Internal Server Error";
  res.status(status).json({ success: false, status, msg });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server Running on PORT ${PORT}`));
