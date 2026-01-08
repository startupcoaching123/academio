const mongoose = require("mongoose");

// Blog Schema
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  featuredImage: { type: String },
  contentImages: [{ type: String }],
  slug: { type: String, unique: true },
  metaDescription: String,
  keywords: [String],
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  author: { type: String },
  publishedAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
