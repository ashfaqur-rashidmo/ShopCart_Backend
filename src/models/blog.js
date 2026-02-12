import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    blog : {
        type: String,
        required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    author: {
      type: String,
      required: true,
    },

    mainImage: {
      type: String,
      required: true,
    },

    body: {
      type: String,
      required: true,
    },

    blogCategories: {
      type: [String], 
      default: [],
    },

    publishedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
