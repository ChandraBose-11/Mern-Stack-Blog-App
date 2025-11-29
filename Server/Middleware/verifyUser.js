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

import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  // If no token → unauthorized
  if (!token) {
    return next(errorHandler(401, "Unauthorized: No token provided"));
  }

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return next(errorHandler(401, "Unauthorized: Invalid token"));
    }

    // Attach decoded payload (id, isAdmin)
    req.user = user;

    // Continue to next middleware
    next();
  });
};
