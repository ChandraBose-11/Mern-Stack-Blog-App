// import jwt from "jsonwebtoken";
// import { errorHandler } from "./error.js";

// export const verifyToken = (req, res, next) => {
//   const token = req.cookies.access_token;
//   if (!token) return next(errorHandler(401, "Unauthorized: No token provided"));
//    try {
//      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
//     if (err) return next(errorHandler(401, "Unauthorized: Invalid token"));
//     req.user = user;
//     next();
//   });
//    } catch (error) {
//      res.status(401).json({message:"Invaild token"})
//    }
 
// };

// Middleware/verifyUser.js

import jwt from "jsonwebtoken";

/*
  ✅ FIX: Reads token correctly from HTTP-only cookie
*/
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
