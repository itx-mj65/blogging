import express from 'express';
import { addBlog, deleteBlog, Serach, showAllBlogs, showBlog, showBlogByCategory, showBlogBySlug, ShowRelatedblogs, updateBlog } from '../controller/BlogController.js';
import upload from '../config/multer.js';
import { Addcomment, Allcomment, Countcomment } from '../controller/Commentcontroller.js';



const BlogRoute = express.Router();

BlogRoute.post('/add', upload.single("file"), addBlog);
BlogRoute.get('/edit/:blogid', showBlog);
BlogRoute.put('/update/:blogid', upload.single("file"), updateBlog);
BlogRoute.delete('/delete/:blogid', deleteBlog);
BlogRoute.get('/show-all-blog', showAllBlogs);
BlogRoute.get('/get-related-blogs/:category/:blog', ShowRelatedblogs);
BlogRoute.get('/get-blogs-by-category/:category/', showBlogByCategory);
BlogRoute.get('/search', Serach);
BlogRoute.get('/show/:blogslug', showBlogBySlug);
BlogRoute.post('/comment', Addcomment);
BlogRoute.get('/all-comment/:blogid', Allcomment);
BlogRoute.get('/count-comment/:blogid', Countcomment);



export default BlogRoute;
