import { errorHandler } from "../Middleware/error.js";
import bcryptjs from "bcryptjs";
import User from "../Models/userModel.js";
import cloudinary from "../cloudinary.js";

/**
 * Test API endpoint
 */
export const test = (req, res) => {
  res.json({ message: "Test API is working" });
};

// export const updateUser = async (req, res, next) => {
//   try {
//     // console.log("BODY:", req.body);  // ✅ added for debugging
//     // console.log("FILE:", req.file);  // ✅ added for debugging

//     if (req.user.id !== req.params.userId) {
//       return next(errorHandler(403, "You are not allowed to update this user"));
//     }

//     const currentUser = await User.findById(req.params.userId);
//     if (!currentUser) return next(errorHandler(404, "User not found"));

//     const updateData = {};

//     // -----------------------------
//     //  Username Validation (SAFE)
//     // -----------------------------
//     if (typeof req.body.username === "string" && req.body.username.trim() !== "") {

//       const username = req.body.username;

//       if (username.length < 7 || username.length > 20)
//         return next(
//           errorHandler(400, "Username must be between 7 and 20 characters")
//         );

//       if (username.includes(" "))
//         return next(errorHandler(400, "Username cannot contain spaces"));

//       if (username !== username.toLowerCase())
//         return next(errorHandler(400, "Username must be lowercase"));

//       if (!username.match(/^[a-zA-Z0-9.]*$/))
//         return next(
//           errorHandler(400, "Username can only contain letters and numbers")
//         );

//       updateData.username = username;
//     }

//     // -----------------------------
//     // Email update (SAFE)
//     // -----------------------------
//     if (typeof req.body.email === "string" && req.body.email.trim() !== "") {
//       updateData.email = req.body.email;
//     }

//     // -----------------------------
//     // Password update (SAFE)
//     // -----------------------------
//     if (typeof req.body.password === "string" && req.body.password.trim() !== "") {
//       if (req.body.password.length < 6)
//         return next(
//           errorHandler(400, "Password must be at least 6 characters")
//         );

//       updateData.password = bcryptjs.hashSync(req.body.password, 10);
//     }

//     // -----------------------------
//     // Profile picture upload
//     // -----------------------------
//     if (req.file) {
//       try {
//         const profilePictureUrl = await new Promise((resolve, reject) => {
//           const stream = cloudinary.uploader.upload_stream(
//             { folder: "profile_pictures" },
//             (error, result) => {
//               if (error) return reject(error);
//               resolve(result.secure_url);
//             }
//           );
//           stream.end(req.file.buffer);
//         });
//         updateData.profilePicture = profilePictureUrl;
//       } catch (err) {
//         console.error("Cloudinary upload error:", err);
//         return next(errorHandler(500, "Failed to upload profile picture"));
//       }
//     }

//     // -----------------------------
//     // Update only provided fields
//     // -----------------------------
//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.userId,
//       { $set: updateData },
//       { new: true }
//     );

//     const { password, ...rest } = updatedUser._doc;
//     res.status(200).json(rest);

//   } catch (err) {
//     console.error("Update user error:", err);
//     next(err);
//   }
// };



// export const updateUser = async (req, res, next) => {
//   if (req.user.id !== req.params.userId) {
//     return next(errorHandler(403, "You are not allowed to update this user"));
//   }

//   if (req.body.password) {
//     if (req.body.password.length < 6) {
//       return next(errorHandler(400, "Password must be at least 6 characters"));
//     }
//     req.body.password = bcryptjs.hashSync(req.body.password, 10);
//   }

//   if (req.body.username) {
//     if (req.body.username.length < 7 || req.body.username.length > 20) {
//       return next(errorHandler(400, "Username must be between 7 and 20 characters"));
//     }
//     if (req.body.username.includes(" ")) {
//       return next(errorHandler(400, "Username cannot contain spaces"));
//     }
//     if (req.body.username !== req.body.username.toLowerCase()) {
//       return next(errorHandler(400, "Username must be lowercase"));
//     }
//     if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
//       return next(errorHandler(400, "Username can only contain letters and numbers"));
//     }
//   }

//   // ⬇ IMPORTANT: Cloudinary Image Upload
//   if (req.file) {
//     req.body.profilePicture = req.file.path; // Cloudinary auto returns the URL
//   }

//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.userId,
//       { $set: req.body },
//       { new: true }
//     );

//     const { password, ...rest } = updatedUser._doc;
//     res.status(200).json(rest);
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateUser = async (req, res, next) => {
//   if (req.user.id !== req.params.userId) {
//     return next(errorHandler(403, "You are not allowed to update this user"));
//   }

//   // password validation
//   if (req.body.password) {
//     if (req.body.password.length < 6) {
//       return next(errorHandler(400, "Password must be at least 6 characters"));
//     }
//     req.body.password = bcryptjs.hashSync(req.body.password, 10);
//   }

//   // username validation
//   if (req.body.username) {
//     if (req.body.username.length < 7 || req.body.username.length > 20) {
//       return next(errorHandler(400, "Username must be between 7 and 20 characters"));
//     }
//     if (req.body.username.includes(" ")) {
//       return next(errorHandler(400, "Username cannot contain spaces"));
//     }
//     if (req.body.username !== req.body.username.toLowerCase()) {
//       return next(errorHandler(400, "Username must be lowercase"));
//     }
//     if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
//       return next(errorHandler(400, "Username can only contain letters and numbers"));
//     }
//   }

//   try {
//     // ⬇ NEW: Cloudinary Upload if a file exists
//     if (req.file) {
//       const result = await cloudinary.uploader.upload_stream(
//         {
//           folder: "user_profiles",
//         },
//         async (error, uploaded) => {
//           if (error) return next(errorHandler(500, "Cloudinary upload failed"));
          
//           req.body.profilePicture = uploaded.secure_url;

//           // After image upload, update DB
//           const updatedUser = await User.findByIdAndUpdate(
//             req.params.userId,
//             { $set: req.body },
//             { new: true }
//           );

//           const { password, ...rest } = updatedUser._doc;
//           return res.status(200).json(rest);
//         }
//       );

//       // Convert buffer → stream
//       result.end(req.file.buffer);
//       return; // prevent duplicate response
//     }

//     // No file uploaded → normal update
//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.userId,
//       { $set: req.body },
//       { new: true }
//     );

//     const { password, ...rest } = updatedUser._doc;
//     res.status(200).json(rest);
//   } catch (error) {
//     next(error);
//   }
// };

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to update this user"));
  }

  try {
    const updateData = {};

    // USERNAME validation
    if (req.body.username && req.body.username.trim() !== "") {
      const username = req.body.username.trim();

      if (username.length < 7 || username.length > 20) {
        return next(errorHandler(400, "Username must be between 7–20 chars"));
      }
      if (username.includes(" ")) {
        return next(errorHandler(400, "Username cannot contain spaces"));
      }
      if (username !== username.toLowerCase()) {
        return next(errorHandler(400, "Username must be lowercase"));
      }
      if (!/^[a-zA-Z0-9]+$/.test(username)) {
        return next(
          errorHandler(400, "Username may only contain letters & numbers")
        );
      }

      updateData.username = username;
    }

    // EMAIL
    if (req.body.email && req.body.email.trim() !== "") {
      updateData.email = req.body.email.trim();
    }

    // PASSWORD
    if (req.body.password && req.body.password.trim() !== "") {
      if (req.body.password.length < 6)
        return next(
          errorHandler(400, "Password must be at least 6 characters")
        );

      updateData.password = bcryptjs.hashSync(req.body.password, 10);
    }

    // IMAGE UPLOAD
    if (req.file) {
      const cloudinaryUpload = () =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "user_profiles" },
            (err, result) => {
              if (err) reject(err);
              else resolve(result.secure_url);
            }
          );
          stream.end(req.file.buffer);
        });

      updateData.profilePicture = await cloudinaryUpload();
    }

    // UPDATE USER
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: updateData },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (err) {
    console.log(err);
    next(errorHandler(500, "Server error"));
  }
};


/**
 * Get Current User
 */
export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return next(errorHandler(404, "User not found"));

    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to delete this uder"));
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("User has been deleted");
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res, next) => {
  try {
    res
      .clearCookie("access_token",{
        httpOnly: true,
        secure: true,
        sameSite: "None",
        path: "/",
      })
      .status(200)
      .json("User has been signed out");
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to see all users"));  // ✅ fixed order
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    const users = await User.find()
      .sort({ createdAt: sortDirection })   // ✅ fixed typo createAt → createdAt
      .skip(startIndex)
      .limit(limit);

    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    const totalUsers = await User.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      users: usersWithoutPassword,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }
    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
