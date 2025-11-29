import Post from "../Models/postModal.js";
import cloudinary from "../cloudinary.js";
import fs from "fs";
import { errorHandler } from "../Middleware/error.js";

/*
   CREATE POST  (FIXED + WORKING)
 */
export const create = async (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return next(errorHandler(403, "Not allowed"));
  }

  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, "Title and content required"));
  }

  try {
    // Default image URL
    let imageUrl =
      "https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png";

    // ⭐ FIX: Accept Cloudinary URL from frontend
    if (req.body.image) {
      imageUrl = req.body.image;
    }

    // ⭐ ALSO support actual file upload from multer
    if (req.file) {
      const uploaded = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "blog_images" },
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        );
        stream.end(fs.readFileSync(req.file.path));
      });

      imageUrl = uploaded.secure_url;

      try {
        fs.unlinkSync(req.file.path);
      } catch (e) { }
    }

    // Create slug from title
    const slug = req.body.title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "");

    const newPost = new Post({
      ...req.body,
      image: imageUrl, // FINAL FIX: now correct Cloudinary URL is saved
      slug,
      userId: req.user.id,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

/* 
   UPDATE POST
*/
export const updatePost = async (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return next(errorHandler(403, "Not allowed"));
  }

  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return next(errorHandler(404, "Post not found"));

    const updateData = {};

    // TITLE UPDATE + SLUG
    if (req.body.title && req.body.title.trim() !== "") {
      updateData.title = req.body.title.trim();
      updateData.slug = updateData.title
        .split(" ")
        .join("-")
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, "");
    }

    // CONTENT
    if (req.body.content && req.body.content.trim() !== "") {
      updateData.content = req.body.content.trim();
    }

    // CATEGORY
    if (req.body.category && req.body.category.trim() !== "") {
      updateData.category = req.body.category.trim();
    }

    // ⭐ If frontend sends image URL directly
    if (req.body.image) {
      updateData.image = req.body.image;
    }

    // ⭐ If new file uploaded
    if (req.file) {
      const uploadedUrl = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "blog_images" },
          (err, result) => {
            if (err) reject(err);
            else resolve(result.secure_url);
          }
        );
        stream.end(fs.readFileSync(req.file.path));
      });

      updateData.image = uploadedUrl;

      try {
        fs.unlinkSync(req.file.path);
      } catch (e) { }
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      { $set: updateData },
      { new: true }
    );

    return res.status(200).json(updatedPost);
  } catch (error) {
    console.error("updatePost error:", error);
    return next(errorHandler(500, "Failed to update post"));
  }
};

/* 
   GET POSTS
 */
export const getposts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const query = {
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
    };

    const posts = await Post.find(query)
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    if (req.query.slug) {
      return res.status(200).json({ post: posts[0] || null });
    }

    const totalPosts = await Post.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({ posts, totalPosts, lastMonthPosts });
  } catch (error) {
    next(error);
  }
};

/* 
   GET POST BY ID
 */
export const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return next(errorHandler(404, "Post not found"));
    return res.status(200).json(post);
  } catch (error) {
    return next(error);
  }
};

/* 
   DELETE POST
 */
export const deletepost = async (req, res, next) => {
  if (!req.user || (!req.user.isAdmin && req.user.id !== req.params.userId)) {
    return next(errorHandler(403, "Not allowed"));
  }

  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json("Post deleted successfully");
  } catch (error) {
    next(error);
  }
};

/* 
   UPLOAD IMAGE TO CLOUDINARY ONLY
 */
export const Createpostimage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    const uploaded = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "blog_images" },
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
      stream.end(fs.readFileSync(req.file.path));
    });

    try {
      fs.unlinkSync(req.file.path);
    } catch (err) { }

    return res.status(200).json({ imageUrl: uploaded.secure_url });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    res.status(500).json({ msg: "Image upload failed" });
  }
};
