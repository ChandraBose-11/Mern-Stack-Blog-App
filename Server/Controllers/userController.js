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

export const updateUser = async (req, res, next) => {
  try {
    // console.log("BODY:", req.body);  // ✅ added for debugging
    // console.log("FILE:", req.file);  // ✅ added for debugging

    if (req.user.id !== req.params.userId) {
      return next(errorHandler(403, "You are not allowed to update this user"));
    }

    const currentUser = await User.findById(req.params.userId);
    if (!currentUser) return next(errorHandler(404, "User not found"));

    const updateData = {};

    // -----------------------------
    //  Username Validation (SAFE)
    // -----------------------------
    if (typeof req.body.username === "string" && req.body.username.trim() !== "") {

      const username = req.body.username;

      if (username.length < 7 || username.length > 20)
        return next(
          errorHandler(400, "Username must be between 7 and 20 characters")
        );

      if (username.includes(" "))
        return next(errorHandler(400, "Username cannot contain spaces"));

      if (username !== username.toLowerCase())
        return next(errorHandler(400, "Username must be lowercase"));

      if (!username.match(/^[a-zA-Z0-9.]*$/))
        return next(
          errorHandler(400, "Username can only contain letters and numbers")
        );

      updateData.username = username;
    }

    // -----------------------------
    // Email update (SAFE)
    // -----------------------------
    if (typeof req.body.email === "string" && req.body.email.trim() !== "") {
      updateData.email = req.body.email;
    }

    // -----------------------------
    // Password update (SAFE)
    // -----------------------------
    if (typeof req.body.password === "string" && req.body.password.trim() !== "") {
      if (req.body.password.length < 6)
        return next(
          errorHandler(400, "Password must be at least 6 characters")
        );

      updateData.password = bcryptjs.hashSync(req.body.password, 10);
    }

    // -----------------------------
    // Profile picture upload
    // -----------------------------
    if (req.file) {
      try {
        const profilePictureUrl = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "profile_pictures" },
            (error, result) => {
              if (error) return reject(error);
              resolve(result.secure_url);
            }
          );
          stream.end(req.file.buffer);
        });
        updateData.profilePicture = profilePictureUrl;
      } catch (err) {
        console.error("Cloudinary upload error:", err);
        return next(errorHandler(500, "Failed to upload profile picture"));
      }
    }

    // -----------------------------
    // Update only provided fields
    // -----------------------------
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: updateData },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);

  } catch (err) {
    console.error("Update user error:", err);
    next(err);
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
      .clearCookie("access_token")
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
