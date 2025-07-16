import express from 'express';
import { addBlog, Blogs, deleteBlog, Serach, showAllBlogs, showBlog, showBlogByCategory, showBlogBySlug, ShowRelatedblogs, updateBlog } from '../controller/BlogController.js';
import upload from '../config/multer.js';
import { Addcomment, Allcomment, Countcomment, Deletingcomment, GetAllcomment } from '../controller/Commentcontroller.js';
import { OnlyUser } from '../Middleware/Authentication.js';



const BlogRoute = express.Router();

BlogRoute.post('/add', OnlyUser, upload.single("file"), addBlog);
BlogRoute.get('/edit/:blogid', OnlyUser, showBlog);
BlogRoute.put('/update/:blogid', OnlyUser, upload.single("file"), updateBlog);
BlogRoute.delete('/delete/:blogid', OnlyUser, deleteBlog);
BlogRoute.get('/show-all-blog',OnlyUser, showAllBlogs);
BlogRoute.get('/blogs', Blogs);
BlogRoute.get('/get-related-blogs/:category/:blog', ShowRelatedblogs);
BlogRoute.get('/get-blogs-by-category/:category/', showBlogByCategory);
BlogRoute.get('/search', Serach);
BlogRoute.get('/show/:blogslug', showBlogBySlug);
BlogRoute.post('/comment', OnlyUser, Addcomment);
BlogRoute.get('/all-comment/:blogid', Allcomment);
BlogRoute.get('/count-comment/:blogid', Countcomment);
BlogRoute.get('/get-all-comment', OnlyUser, GetAllcomment);
BlogRoute.delete('/delete-comment/:id',OnlyUser, OnlyUser, Deletingcomment);



export default BlogRoute;
