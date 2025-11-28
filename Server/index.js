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

const allowedOrigins = [
  "http://localhost:5173",                  // local (Vite)
  "https://mern-stack-blogapp.netlify.app" // deployed frontend (NO trailing slash)
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS blocked for origin: " + origin));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return res.sendStatus(200);
  }
  next();
});

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
