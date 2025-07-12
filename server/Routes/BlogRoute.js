import express from 'express';
import { addBlog, deleteBlog, showAllBlogs, showBlog, showBlogBySlug, updateBlog } from '../controller/BlogController.js';
import upload from '../config/multer.js';
import { Addcomment } from '../controller/Commentcontroller.js';



const BlogRoute = express.Router();

BlogRoute.post('/add', upload.single("file"), addBlog);
BlogRoute.get('/edit/:blogid', showBlog);
BlogRoute.put('/update/:blogid', upload.single("file"), updateBlog);
BlogRoute.delete('/delete/:blogid', deleteBlog);
BlogRoute.get('/show-all-blog', showAllBlogs);
BlogRoute.get('/show/:blogslug', showBlogBySlug);
BlogRoute.post('/comment', Addcomment);



export default BlogRoute;
