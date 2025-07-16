import { handleError } from "../helper/handleError.js";
import Comment from "../models/commentModel.js";

export const Addcomment = async (req, res, next) => {
    try {
        const { author, blogid, comment } = req.body
        const newComment = new Comment({
            author,
            blogid,
            comment
        })
        await newComment.save()
        res.status(200).json({
            success: true,
            message: "Comment added successfuly",
            comment: newComment
        })

    } catch (error) {
        next(handleError(500, "Internal Server Error while deleting blog"));

    }
}

export const Allcomment = async (req, res, next) => {
    try {
        const { blogid } = req.params;
        const comments = await Comment.find({ blogid }).populate('author', 'name avatar').sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: "All comments fetched successfully",
            comments
        })

    } catch (error) {
        next(handleError(500, "Internal Server Error while Fetching comments"));

    }
}
export const Countcomment = async (req, res, next) => {
    try {
        const { blogid } = req.params;
        const comments = await Comment.countDocuments({ blogid })
        res.status(200).json({
            count: comments
        })

    } catch (error) {
        next(handleError(500, "Internal Server Error while  Counting the comment"));

    }
}

export const GetAllcomment = async (req, res, next) => {
    try {
        const user = req.user
        let comments
        if (user.role == 'admin') {

            comments = await Comment.find().populate('author', 'name').populate('blogid', 'title').sort({ createdAt: -1 });
        } else {
            comments = await Comment.find({ author: user.id }).populate('author', 'name').populate('blogid', 'title').sort({ createdAt: -1 });

        }
        res.status(200).json({
            success: true,
            message: "All comments fetched successfully",
            comments
        })

    } catch (error) {
        next(handleError(500, `Internal Server Error while Fetching all blog ${error}`));

    }
}
export const Deletingcomment = async (req, res, next) => {
    try {
        const { id } = req.params
        const comments = await Comment.findByIdAndDelete(id)
        res.status(200).json({
            success: true,
            message: "All comments fetched successfully",
            comments
        })

    } catch (error) {
        next(handleError(500, `Internal Server Error while Fetching all blog ${error}`));

    }
}