import express from "express";
import {
  test,
  updateUser,
  deleteUser,
  signout,
  getUsers,
  getUser,
} from "../Controllers/userController.js";
import { verifyToken } from "../Middleware/verifyUser.js";
import upload from "../Middleware/multer.js";

const router = express.Router();

router.get("/test", test);

// UPDATE PROFILE   ( protected + multer )
router.put("/update/:userId", verifyToken, upload.single("profilePicture"), updateUser);

// DELETE USER  ( protected )
router.delete("/delete/:userId", verifyToken, deleteUser);

// SIGNOUT  ( protected ) <-- you forgot this
router.post("/signout", verifyToken, signout);

// GET ALL USERS   ( only admin )
router.get("/getusers", verifyToken, getUsers);

// GET ONE USER
router.get("/:userId", getUser);

export default router;
