import { handleError } from "../helper/handleError.js"
import Category from "../models/categoryModel.js"

export const addcategory = async (req, res, next) => {
    try {
        const { name, slug } = req.body
        const category = new Category({
            name,
            slug
        })
        await category.save()
        res.status(200).json({
            success: true,
            message: "Category Added Successfully"
        })

    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const updatecategory = async (req, res, next) => {
    try {
        const { categoryid } = req.params
        const { name, slug } = req.body
        const category = await Category.findByIdAndUpdate(categoryid, { name, slug }, { new: true })

        res.status(200).json({
            success: true,
            message: "Category Updated Successfully",
            category
        })


    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const showcategory = async (req, res, next) => {
    const { categoryid } = req.params
    try {
        const category = await Category.findById(categoryid).lean().exec()
        if (!category) {
            next(handleError(404, "Category Not Found"))
        } else {
            res.status(200).json({
                category
            })
        }
    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const deletecategory = async (req, res, next) => {
    try {
        const { categoryid } = req.params
        await Category.findByIdAndDelete(categoryid)

        res.status(200).json({
            success: true,
            message: "Category Deleted Successfully"
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}
export const allcategory = async (req, res, next) => {
    try {

        const category = await Category.find().sort({ name: 1 }).lean().exec()
        res.status(200).json({
            category
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}