import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/DB.js'; // Assuming db.js is in the same directory
import AuthRoute from './Routes/AuthRoites.js';
import UserRoute from './Routes/UserRoute.js';
import CategoryRoute from './Routes/CategoryRoute.js';
const app = express();
dotenv.config();
const port = process.env.PORT || 3000;
connectDB(); // Ensure this function is defined in your DB.js file

app.use(cors({
    origin: process.env.Frontend_URL,
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//  Routes setup

app.use("/api/auth", AuthRoute)
app.use("/api/user", UserRoute)
app.use("/api/category", CategoryRoute)









app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({ message });
});