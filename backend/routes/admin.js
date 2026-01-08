const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const Blog = require('../models/blogs');
const { cloudinary } = require('../utils/cloudinary');
const upload = require('../middleware/multerConfig');
const authenticateAdmin = require('../middleware/authenticateAdmin');
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");    

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "6h" });

    res.json({
      token,
      admin: {
        id: admin._id,
        username: admin.username,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get('/auth/validate', authenticateAdmin, (req, res) => {
  console.log('Validated admin:', req.admin.username);
  res.json({ valid: true, admin: { id: req.admin._id, username: req.admin.username } });
});

// Public: Get all categories
router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.find().sort({ name: 1 });
        res.json(categories);
    } catch (error) {
        console.error('Category fetch error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Protected: Create a new category
router.post('/categories', authenticateAdmin, async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Category name is required' });
        }

        const existingCategory = await Category.findOne({ name: name.trim() });
        if (existingCategory) {
            return res.status(400).json({ error: 'Category already exists' });
        }

        const category = new Category({ name: name.trim() });
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        console.error('Category creation error:', error);
        res.status(500).json({ error: error.message });
    }
});

/* ========== BLOG APIs ========== */

// Generate unique slug helper function
const generateUniqueSlug = async (title) => {
    let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    let uniqueSlug = slug;
    let counter = 1;

    while (await Blog.findOne({ slug: uniqueSlug })) {
        uniqueSlug = `${slug}-${counter}`;
        counter++;
    }
    return uniqueSlug;
};

// IMPORTANT: More specific routes MUST come before /:slug route to avoid conflicts

// Public endpoint for related blogs (no authentication required)
router.get("/blogs/related", async (req, res) => {
    try {
        const { categories, exclude, limit = 4, status = "published" } = req.query;
        
        let filter = { status };
        
        // Add category filter if provided
        if (categories) {
            const categoryIds = categories.split(',').filter(id => id.trim());
            if (categoryIds.length > 0) {
                filter.categories = { $in: categoryIds };
            }
        }
        
        // Exclude specific blog if provided
        if (exclude) {
            filter._id = { $ne: exclude };
        }
        
        const limitNum = parseInt(limit, 10) || 4;
        
        const blogs = await Blog.find(filter)
            .populate("categories")
            .sort({ createdAt: -1 })
            .limit(limitNum);
        
        res.json(blogs);
    } catch (error) {
        console.error("Related blogs error:", error);
        res.status(500).json({ error: error.message });
    }
});

// Search Blogs API (public - no authentication required)
router.get("/blogs/search", async (req, res) => {
    try {
        const { q, category, page = 1, limit = 10, status } = req.query;
        let filter = {};
        
        // Add status filter (default to published for public searches)
        if (status) {
            filter.status = status;
        }

        // Add search query filter if provided
        if (q && q.trim()) {
            filter.$or = [
                { title: { $regex: q, $options: "i" } },
                { content: { $regex: q, $options: "i" } },
                { metaDescription: { $regex: q, $options: "i" } },
            ];
        }

        // Add category filter if provided
        if (category && category.trim()) {
            const categoryDoc = await Category.findOne({ name: category.trim() });
            if (categoryDoc) {
                filter.categories = categoryDoc._id;
            } else {
                return res.json({ blogs: [], total: 0, totalPages: 0 });
            }
        }

        // Convert page and limit to numbers
        const pageNum = parseInt(page, 10) || 1;
        const limitNum = parseInt(limit, 10) || 10;
        const skip = (pageNum - 1) * limitNum;

        // Fetch blogs with pagination
        const blogs = await Blog.find(filter)
            .populate("categories")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNum);

        // Get total count for pagination
        const total = await Blog.countDocuments(filter);
        const totalPages = Math.ceil(total / limitNum);

        res.json({
            blogs,
            total,
            totalPages,
        });
    } catch (error) {
        console.error("Search error:", error);
        res.status(500).json({ error: error.message });
    }
});

// Get all blogs - for admin panel, return all blogs without pagination by default
router.get("/blogs", authenticateAdmin, async (req, res) => {
    try {
        const { page, limit, status } = req.query;
        
        // If pagination params exist, use pagination
        if (page || limit) {
            const pageNum = parseInt(page, 10) || 1;
            const limitNum = parseInt(limit, 10) || 10;
            const skip = (pageNum - 1) * limitNum;
            
            let filter = {};
            if (status) {
                filter.status = status;
            }
            
            const blogs = await Blog.find(filter)
                .populate('categories')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limitNum);
            
            const total = await Blog.countDocuments(filter);
            const totalPages = Math.ceil(total / limitNum);
            
            return res.json({
                blogs,
                total,
                totalPages
            });
        }
        
        // Otherwise return all blogs (for admin panel)
        const blogs = await Blog.find().populate('categories').sort({ createdAt: -1 });
        res.json(blogs);
    } catch (error) {
        console.error("Blog fetch error:", error);
        res.status(500).json({ error: error.message });
    }
});

// Get single blog by slug (PUBLIC - no authentication required for published blogs)
router.get("/blogs/:slug", async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug, status: "published" }).populate('categories');
        if (!blog) return res.status(404).json({ error: "Blog not found" });
        res.json(blog);
    } catch (error) {
        console.error("Single blog fetch error:", error);
        res.status(500).json({ error: error.message });
    }
});

// Create blog post
router.post("/blogs", authenticateAdmin, (req, res, next) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error('Upload error:', err);
            return res.status(400).json({ error: err.message });
        }

        try {
            const { title, content, metaDescription, keywords, categories, author, publishedAt, status } = req.body;

            if (!title || !content) {
                return res.status(400).json({ error: "Title and content are required" });
            }

            // Parse categories if it's a JSON string
            let parsedCategories = [];
            if (categories) {
                try {
                    parsedCategories = typeof categories === 'string' ? JSON.parse(categories) : categories;
                } catch (e) {
                    parsedCategories = categories || [];
                }
            }

            // Verify categories exist (only if categories are provided)
            if (parsedCategories.length) {
                const categoriesExist = await Category.find({ _id: { $in: parsedCategories } });
                if (categoriesExist.length !== parsedCategories.length) {
                    return res.status(400).json({ error: 'One or more invalid categories' });
                }
            }

            // Generate slug if not provided
            const slug = req.body.slug || await generateUniqueSlug(title);

            // Prepare blog data
            const blogData = {
                title,
                content,
                slug,
                metaDescription: metaDescription || "",
                keywords: keywords ? keywords.split(",").map(k => k.trim()).filter(k => k) : [],
                categories: parsedCategories,
                author: author || "",
                publishedAt: publishedAt || null,
                status: status || 'draft',
                updatedAt: Date.now()
            };

            // Add image URLs if they exist
            if (req.files?.featuredImage?.[0]) {
                blogData.featuredImage = req.files.featuredImage[0].path;
            }

            if (req.files?.contentImages) {
                blogData.contentImages = req.files.contentImages.map(file => file.path);
            }

            // Create and save blog
            const blog = new Blog(blogData);
            await blog.save();

            // Populate categories for response
            const populatedBlog = await Blog.findById(blog._id).populate('categories');

            res.status(201).json({
                message: "Blog post created successfully",
                blog: populatedBlog
            });

        } catch (error) {
            console.error("Blog creation error:", error);

            // Delete any uploaded images if error occurs
            if (req.files) {
                const deleteImages = async (files) => {
                    try {
                        await Promise.all(
                            files.map(file => cloudinary.uploader.destroy(file.filename))
                        );
                    } catch (deleteError) {
                        console.error("Error cleaning up images:", deleteError);
                    }
                };

                if (req.files.featuredImage) {
                    await deleteImages(req.files.featuredImage);
                }
                if (req.files.contentImages) {
                    await deleteImages(req.files.contentImages);
                }
            }

            res.status(500).json({ error: "Failed to create blog post" });
        }
    });
});

// Update blog post
router.put("/blogs/:id", authenticateAdmin, (req, res, next) => {
    upload(req, res, async (err) => {
        if (err) return res.status(400).json({ error: err.message });

        try {
            const { title, content, metaDescription, keywords, categories = [], author, publishedAt, status, slug } = req.body;

            if (!title || !content) {
                return res.status(400).json({ error: "Title and content are required" });
            }

            // Only validate categories if they're provided
            if (categories.length > 0) {
                const categoriesExist = await Category.find({ _id: { $in: categories } });
                if (categoriesExist.length !== categories.length) {
                    return res.status(400).json({ error: 'One or more invalid categories' });
                }
            }

            const updateData = {
                title,
                content,
                metaDescription,
                keywords: keywords ? keywords.split(",").map(k => k.trim()) : [],
                categories,
                author: author || "",
                publishedAt: publishedAt || null,
                status: status || 'draft',
                updatedAt: Date.now(),
            };

            if (slug) updateData.slug = slug;
            if (req.files?.featuredImage?.[0]) updateData.featuredImage = req.files.featuredImage[0].path;
            if (req.files?.contentImages) updateData.contentImages = req.files.contentImages.map(file => file.path);

            const blog = await Blog.findByIdAndUpdate(
                req.params.id,
                { $set: updateData },
                { new: true }
            ).populate('categories');

            if (!blog) return res.status(404).json({ error: "Blog not found" });
            res.json({ message: "Blog updated successfully", blog });
        } catch (error) {
            console.error("Blog update error:", error);
            res.status(500).json({ error: error.message });
        }
    });
});

// Delete blog post
router.delete("/blogs/:id", authenticateAdmin, async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) return res.status(404).json({ error: "Blog not found" });

        const deleteImage = async (url) => {
            if (!url) return;
            try {
                const publicId = url.split('/').slice(-2).join('/').split('.')[0];
                await cloudinary.uploader.destroy(publicId);
            } catch (err) {
                console.error("Error deleting image:", err);
            }
        };

        await deleteImage(blog.featuredImage);
        if (blog.contentImages && blog.contentImages.length > 0) {
            await Promise.all(blog.contentImages.map(deleteImage));
        }

        res.json({ message: "Blog deleted successfully" });
    } catch (error) {
        console.error("Blog deletion error:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;