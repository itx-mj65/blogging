import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
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
    comment: {
        type: String,
        required: true,
        trim: true,
    }
}, { timestamps: true });

const Comment = mongoose.model("comment", commentSchema, "comments");
export default Comment;
