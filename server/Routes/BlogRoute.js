import express from 'express';
import { addBlog, deleteBlog, editBlog, showAllBlogs, updateBlog } from '../controller/BlogController.js';
import upload from '../config/multer.js';



const BlogRoute = express.Router();

BlogRoute.post('/add', upload.single("file"), addBlog);
BlogRoute.get('/edit/:blogid', editBlog);
BlogRoute.put('/update/:blogid', upload.single("file"), updateBlog);
BlogRoute.delete('/delete/:blogid', deleteBlog);
BlogRoute.get('/show-all-blog', showAllBlogs);



export default BlogRoute;
