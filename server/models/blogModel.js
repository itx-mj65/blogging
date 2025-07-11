import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
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
        trim: true,
    },
    blogcontent: {
        type: String,
        required: true,
        trim: true,
    },
    featuredImage: {
        type: String,
        required: true,
        trim: true,
    },
}, { timestamps: true });

const Blog = mongoose.model("blog", blogSchema, "blogs");
export default Blog;
