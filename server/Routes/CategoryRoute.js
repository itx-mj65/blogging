import express from 'express';
import { addcategory, allcategory, deletecategory, showcategory, updatecategory } from '../controller/CategoryController.js';


const CategoryRoute = express.Router();

CategoryRoute.post('/add', addcategory);
CategoryRoute.put('/update/:categoryid', updatecategory);
CategoryRoute.delete('/delete/:categoryid', deletecategory);
CategoryRoute.get('/show/:categoryid', showcategory);
CategoryRoute.get('/all-category', allcategory);


export default CategoryRoute;
