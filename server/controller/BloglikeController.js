import { handleError } from "../helper/handleError.js";
import BlogLike from "../models/bloglikeModel.js";

export const Dolike = async (req, res, next) => {
    try {
        const { blogid, author } = req.body;
        let like
        like = await BlogLike.findOne({ blogid, author });
        if (like) {
            // If the like already exists, remove it
            await BlogLike.deleteOne({ _id: like._id });

        } else {
            // If the like does not exist, create a new one
            const newLike = new BlogLike({
                blogid,
                author
            });
            await newLike.save();

        }
        let count = await BlogLike.countDocuments({ blogid });
        res.status(200).json({
            success: true,
            message: "Like status toggled successfully",
            count
        });

    } catch (error) {
        next(handleError(500, "Internal Server Error while liking blog"));

    }
}

export const Countlike = async (req, res, next) => {
    try {
        const { blogid } = req.params;
        const { userid } = req.query;
        const count = await BlogLike.countDocuments({ blogid });
        let isLiked
        if (userid) {
            const haslike = await BlogLike.exists({ blogid, author: userid });
            if (!haslike) {
                isLiked = false;

            } else {
                isLiked = true;
            }
        }
        res.status(200).json({
            count,
            isLiked
        });

    } catch (error) {
        next(handleError(500, "Internal Server Error while counting likes"));

    }
}