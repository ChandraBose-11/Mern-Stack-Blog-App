import Post from "../Models/postModal.js";
import cloudinary from "../cloudinary.js";
import fs from "fs";
import { errorHandler } from "../Middleware/error.js";

// Create Post
export const create = async (req, res, next) => {
  if (!req.user || !req.user.isAdmin)
    return next(errorHandler(403, "Not allowed"));

  if (!req.body.title || !req.body.content)
    return next(errorHandler(400, "Title and content required"));

  try {
    let imageUrl =
      "https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "blog_images",
      });
      imageUrl = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const slug = req.body.title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "");

    const newPost = new Post({
      ...req.body,
      image: imageUrl,
      slug,
      userId: req.user.id,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};


export const updatePost = async (req, res, next) => {
  if (!req.user || !req.user.isAdmin)
    return next(errorHandler(403, "Not allowed"));

  const postId = req.params.postId;
  try {
    const post = await Post.findById(postId);
    if (!post) return next(errorHandler(404, "Post not found"));

    // Upload new image to Cloudinary if provided
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "blog_images",
      });
      post.image = result.secure_url;
      // remove local uploaded file
      try {
        fs.unlinkSync(req.file.path);
      } catch (e) {
        /* ignore */
      }
    }

    // update fields
    post.title = req.body.title ?? post.title;
    post.content = req.body.content ?? post.content;
    post.category = req.body.category ?? post.category;

    // rebuild slug if title changed
    post.slug = (post.title || "")
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "");

    const updatedPost = await post.save();
    return res.status(200).json(updatedPost);
  } catch (error) {
    console.error("updatePost error:", error);
    return next(errorHandler(500, "Failed to update post"));
  }
};

// Get Posts (single or multiple)
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
      // Single post by slug
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

// Get Single Post by ID
export const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return next(errorHandler(404, "Post not found"));
    // Return raw post document
    return res.status(200).json(post);
  } catch (error) {
    console.error("getPostById error:", error);
    return next(error);
  }
};
// Delete Post
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
