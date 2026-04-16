const express = require("express");
const Blog = require("../models/Blog");
const router = express.Router();

const requireAdmin = (req, res, next) => {
  const role = req.header("x-user-role");
  if (role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};

router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (req.query.published === "true") {
      filter.published = true;
    } else if (req.header("x-user-role") !== "admin") {
      filter.published = true;
    }
    const blogs = await Blog.find(filter).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Could not load blogs" });
  }
});

router.post("/", requireAdmin, async (req, res) => {
  try {
    const { title, content, author, published = false } = req.body;
    const blog = new Blog({ title, content, author, published });
    const createdBlog = await blog.save();
    res.status(201).json(createdBlog);
  } catch (error) {
    res.status(400).json({ message: "Could not create blog" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    if (!blog.published && req.header("x-user-role") !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Could not load blog" });
  }
});

router.put("/:id", requireAdmin, async (req, res) => {
  try {
    const { title, content, author, published } = req.body;
    const updateData = { title, content, author };
    if (typeof published !== "undefined") {
      updateData.published = published;
    }
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    res.status(400).json({ message: "Could not update blog" });
  }
});

router.patch("/:id/publish", requireAdmin, async (req, res) => {
  try {
    const { published } = req.body;
    if (typeof published !== "boolean") {
      return res.status(400).json({ message: "Published value must be true or false" });
    }
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { published },
      { new: true }
    );
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    res.status(400).json({ message: "Could not update publish state" });
  }
});

router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json({ message: "Blog deleted" });
  } catch (error) {
    res.status(500).json({ message: "Could not delete blog" });
  }
});

module.exports = router;
