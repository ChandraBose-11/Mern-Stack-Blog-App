import express from "express";
import multer from "multer";
import { verifyToken } from "../Middleware/verifyUser.js";
import {
  create,
  getposts,
  deletepost,
  updatePost,
  getPostById,
} from "../Controllers/postController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/create", verifyToken, upload.single("image"), create);
router.get("/getposts", getposts);
router.get("/:postId", getPostById); // used by frontend to fetch by id
router.delete("/deletepost/:postId/:userId", verifyToken, deletepost);
router.put("/update/:postId", verifyToken, upload.single("image"), updatePost);

export default router;
