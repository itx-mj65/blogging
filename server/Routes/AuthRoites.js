import express from 'express';
import { register , login , googlelogin, logout } from '../controller/AuthController.js';

const AuthRoute = express.Router();

AuthRoute.post('/register', register);
AuthRoute.post('/login', login);
AuthRoute.post('/google-login', googlelogin);
AuthRoute.get("/logout", logout)

export default AuthRoute;
