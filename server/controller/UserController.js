import cloudinary from "../config/cloudinary.js"
// import upload from "../config/multer.js"
import { handleError } from "../helper/handleError.js"
import User from "../models/userModel.js"
import bcrypt from 'bcrypt'

export const getuser = async (req, res, next) => {
    const { userid } = req.params

    try {
        const user = await User.findOne({ _id: userid }).lean().exec()
        if (!user) {
            next(handleError(404, "user not foud"))
        } else {
            res.status(200).json({
                succuss: true,
                message: "use data found",
                user
            })
        }

    } catch (error) {
        next(handleError(500, error.message + "mj"))

    }

}



export const updateuser = async (req, res, next) => {
    const { userid } = req.params
    console.log(userid)
    const data = JSON.parse(req.body.data)
    try {
        const user = await User.findById(userid)
        user.name = data.name
        user.email = data.email
        user.bio = data.bio
        if (data.password && data.password.length >= 4) {
            const hash = bcrypt.hashSync(data.password, 10);
            user.password = hash
        }
        try {
            if (req.file) {
                const uploadResult = await cloudinary.uploader.upload(
                    req.file.path,
                    { folder: "bloggong", resource_type: "auto" }
                )

                user.avatar = uploadResult.secure_url
            }
        } catch (error) {
            next(handleError(500, error.message))
        }

        await user.save()





        // console.log(req.file)
        res.status(200).json({
            succuss: true,
            message: "user updated",
            user
        })

    } catch (error) {
        next(handleError(500, error.message + "mj from update route"))

    }
}