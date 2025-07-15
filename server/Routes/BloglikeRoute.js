import express from 'express';
import { Countlike, Dolike } from '../controller/BloglikeController.js';

const BlogLikeRoute = express.Router();

BlogLikeRoute.post('/dolike', Dolike);
BlogLikeRoute.get('/count-like/:blogid/', Countlike);

export default BlogLikeRoute;
