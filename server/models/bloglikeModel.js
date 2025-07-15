import mongoose from "mongoose";

const bloglikeSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    blogid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "blog",
        required: true,
    },
   
}, { timestamps: true });

const BlogLike = mongoose.model("bloglike", bloglikeSchema, "bloglikes");
export default BlogLike;
