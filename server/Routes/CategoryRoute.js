import express from 'express';
import { addcategory, allcategory, deletecategory, showcategory, updatecategory } from '../controller/CategoryController.js';
import { OnlyAdmin } from '../Middleware/Authentication.js';


const CategoryRoute = express.Router();

CategoryRoute.post('/add', OnlyAdmin, addcategory);
CategoryRoute.put('/update/:categoryid', OnlyAdmin, updatecategory);
CategoryRoute.delete('/delete/:categoryid', OnlyAdmin, deletecategory);
CategoryRoute.get('/show/:categoryid', showcategory);
CategoryRoute.get('/all-category', allcategory);


export default CategoryRoute;
