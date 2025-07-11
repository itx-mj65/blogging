import cloudinary from "../config/cloudinary.js";
import { handleError } from "../helper/handleError.js";
import Blog from "../models/blogModel.js";
import { encode } from "entities";
export const addBlog = async (req, res, next) => {
    try {
        const data = JSON.parse(req.body.data);
        const { author, category, title, slug, blogcontent } = data
        let secimage = "";
        if (req.file) {
            const uploadResult = await cloudinary.uploader.upload(
                req.file.path,
                { folder: "bloggong", resource_type: "auto" }
            )

            secimage = uploadResult.secure_url
        }
        const blog = new Blog({
            author,
            category,
            title,
            slug,
            blogcontent: encode(blogcontent),
            featuredImage: secimage
        })
        await blog.save();
        res.status(201).json({
            success: true,
            message: "Blog added successfully",
            blog
        });

    } catch (error) {
        next(handleError(500, "Internal Server Error while adding blog"));

    }
}

export const updateBlog = async (req, res, next) => {
    try {
        const { blogid } = req.params;
        const data = JSON.parse(req.body.data);
        const {  category, title, slug, blogcontent } = data
        let secimage = "";
        if (req.file) {
            const uploadResult = await cloudinary.uploader.upload(
                req.file.path,
                { folder: "bloggong", resource_type: "auto" }
            )

            secimage = uploadResult.secure_url
        }
        const blog = await Blog.findByIdAndUpdate(blogid, {
            category,
            title,
            slug,
            blogcontent: encode(blogcontent),
            featuredImage: secimage
        }, { new: true });

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            blog
        });

    } catch (error) {
        next(handleError(500, "Internal Server Error while editing blog"));

    }
}
export const showBlog = async (req, res, next) => {
    try {
        const { blogid } = req.params;
        const blog = await Blog.findById(blogid).populate("author", "name").populate("category", "name").lean().exec();
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Blog fetched successfully",
            blog
        });

    } catch (error) {
        next(handleError(500, "Internal Server Error while showing blog"));

    }
}
export const deleteBlog = async (req, res, next) => {
    try {
        const { blogid } = req.params;
        const blog = await Blog.findByIdAndDelete(blogid);
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Blog deleted successfully"
        });
    } catch (error) {
        next(handleError(500, "Internal Server Error while deleting blog"));

    }
}
export const showAllBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find().populate("author", "name avatar role ").populate("category", "name slug").sort({ createdAt: -1 }).lean().exec();
        if (!blogs) {
            return res.status(404).json({
                success: false,
                message: "No blogs found"
            });
        } else {
            return res.status(200).json({
                success: true,
                message: "Blogs fetched successfully",
                blogs
            });
        }

    } catch (error) {
        next(handleError(500, "Internal Server Error while showing all blogs"));

    }
}

export const showBlogBySlug = async (req, res, next) => {
    try {
        const { blogslug } = req.params;
        const blogData = await Blog.findOne({ slug: blogslug })
            .populate("author", "name avatar role")
            .populate("category", "name slug");
        if (!blogData) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Blog fetched successfully",
            blog: blogData
        });

    } catch (error) {
        next(handleError(500, "Internal Server Error while showing blog"));

    }
}