import { errorHandler } from "../Middleware/error.js";
import User from "../Models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// Default cookie expiry if .env is missing the value
const COOKIE_DAYS = process.env.COOKIE_EXPIRES_IN || 7;

// Ensure JWT secret exists
if (!process.env.JWT_SECRET_KEY) {
  console.error("❌ ERROR: Missing JWT_SECRET_KEY in environment variables.");
}

//SIGNUP

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Added return to stop further execution
    return res.json({ success: true, message: "Signup successful" });
  } catch (error) {
    next(error);
  }
};

// 🟢 SIGNIN

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }

    // Create JWT Token
    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET_KEY
    );

    const { password: pwd, ...rest } = validUser._doc;

    return res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        partitioned: true,  
        expires: new Date(Date.now() + COOKIE_DAYS * 24 * 60 * 60 * 1000),
      })
      .json({ success: true, ...rest });
  } catch (error) {
    next(error);
  }
};

// 🟢 GOOGLE AUTH

export const googleAuth = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;

  try {
    const user = await User.findOne({ email });

    // If user exists → login
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET_KEY
      );

      const { password, ...rest } = user._doc;

      return res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
          partitioned: true,  
          expires: new Date(Date.now() + COOKIE_DAYS * 24 * 60 * 60 * 1000),
        })
        .json(rest);
    }

    // Else → Create new Google user
    const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);

    const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

    const newUser = new User({
      username:
        name.toLowerCase().split(" ").join("") +
        Math.random().toString(9).slice(-4),
      email,
      password: hashedPassword,
      profilePicture: googlePhotoUrl,
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, isAdmin: newUser.isAdmin },
      process.env.JWT_SECRET_KEY
    );

    const { password, ...rest } = newUser._doc;

    return res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        expires: new Date(Date.now() + COOKIE_DAYS * 24 * 60 * 60 * 1000),
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
