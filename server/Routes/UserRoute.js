import express from 'express';
import { DelateUser, getAllUser, getuser , updateuser } from '../controller/UserController.js';
import upload from '../config/multer.js';
import { OnlyAdmin, OnlyUser } from '../Middleware/Authentication.js';

const UserRoute = express.Router();

UserRoute.get('/get-user/:userid',OnlyUser, getuser);
UserRoute.get('/get-all-user',OnlyAdmin, getAllUser);
UserRoute.delete('/delete/:userid',OnlyAdmin, DelateUser);
UserRoute.put('/update-user/:userid',OnlyUser, upload.single("file"), updateuser);

export default UserRoute;
