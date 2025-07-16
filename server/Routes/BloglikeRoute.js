import express from 'express';
import { Countlike, Dolike } from '../controller/BloglikeController.js';
import { OnlyUser } from '../Middleware/Authentication.js';

const BlogLikeRoute = express.Router();

BlogLikeRoute.post('/dolike',OnlyUser, Dolike);
BlogLikeRoute.get('/count-like/:blogid/', Countlike);

export default BlogLikeRoute;
