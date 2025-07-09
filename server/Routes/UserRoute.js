import express from 'express';
import { getuser } from '../controller/UserController.js';

const UserRoute = express.Router();

UserRoute.get('/get-user/:userid', getuser);

export default UserRoute;
