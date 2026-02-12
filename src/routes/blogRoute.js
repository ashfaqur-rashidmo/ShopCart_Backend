// backend/routes/blogs.js
import express from "express";
import Blog from "../models/Blog.js";

const router = express.Router();

// POST /api/blogs => create a new blog
router.post("/", async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    const savedBlog = await newBlog.save();
    res.status(201).json({ success: true, data: savedBlog });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/blogs/latest => get latest blogs
router.get("/latest", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ publishedAt: -1 }).limit(4);
    res.status(200).json({ success: true, data: blogs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/blogs => get all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ publishedAt: -1 });

    res.status(200).json({
      success: true,
      data: blogs,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// GET /api/blogs/:slug => get single blog by slug
router.get("/:slug", async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    res.status(200).json({ success: true, data: blog });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


export default router;
