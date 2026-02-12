// controllers/blogController.js
import Blog from "../models/Blog.js";

// CREATE BLOG
export const createBlog = async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET LATEST 4 BLOGS
export const getLatestBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .sort({ publishedAt: -1 })
      .limit(4); 

    res.status(200).json({
      success: true,
      data: blogs,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
