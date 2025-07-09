import { handleError } from "../helper/handleError.js"
import User from "../models/userModel.js"

 export const getuser = async (req, res, next) => {
    const { userid } = req.params

    try {
        const user = await User.findOne({ _id: userid }).lean().exec()
        if (!user) {
            next(handleError(404, "user not foud"))
        }else{
            res.status(200).json({
                succuss:true,
                message:"use data found",
                user
            })
        }

    } catch (error) {
        next(handleError(500, error.message +"mj"))

    }

}