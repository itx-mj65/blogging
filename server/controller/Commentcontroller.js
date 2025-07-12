import { handleError } from "../helper/handleError.js";
import Comment from "../models/commentModel.js";

export const Addcomment = async (req, res, next) => {
    try {
        const {author , blogid, comment}= req.body
        const  newComment= new Comment({
            author,
            blogid,
            comment
        })
        await newComment.save()
        res.status(200).json({
            success:true,
            message:"Comment added successfuly",
            comment:newComment
        })

    } catch (error) {
        next(handleError(500, "Internal Server Error while deleting blog"));

    }
}