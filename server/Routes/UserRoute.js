import express from 'express';
import { getuser , updateuser } from '../controller/UserController.js';
import upload from '../config/multer.js';

const UserRoute = express.Router();

UserRoute.get('/get-user/:userid', getuser);
UserRoute.put('/update-user/:userid', upload.single("file"), updateuser);

export default UserRoute;
