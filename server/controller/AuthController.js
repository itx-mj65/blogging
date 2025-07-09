import { handleError } from "../helper/handleError.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const checkuser = await User.findOne({ email });
        if (checkuser) {
            next(handleError(400, "User already exists"));
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({
                name,
                email,
                password: hashedPassword,
            });
            await user.save();

            res.status(201).json({
                success: true,
                message: "User registered successfully",

            });
        }
    } catch (error) {
        next(handleError(500, "Internal Server Error"));
    }
}

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            next(handleError(400, "User not found"));
        } else {
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                next(handleError(400, "Invalid password"));
            } else {
                const token = jwt.sign({
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar,
                    id: user._id,
                }, process.env.JWT_SECRET, { expiresIn: "10h" });
                res.cookie("access_token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
                    path: "/"
                });
                const newUser = user.toObject();
                delete newUser.password;
                res.status(200).json({
                    success: true,
                    message: "User logged in successfully",
                    user: newUser
                });
            }
        }
    } catch (error) {
        next(handleError(500, "Internal Server Error by mj"));
    }
}
export const googlelogin = async (req, res, next) => {
    const { email, name, avatar } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            // create a new user
            const password = Math.random().toString(36).substring(2, 15);
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                name,
                email,
                avatar,
                password: hashedPassword,
            });
            await newUser.save();

            const token = jwt.sign({
                name: newUser.name,  // ✅ fixed
                email: newUser.email,
                avatar: newUser.avatar,
                id: newUser._id,
            }, process.env.JWT_SECRET, { expiresIn: "10h" });

            res.cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
                path: "/"
            });

            const objuser = newUser.toObject();  // ✅ fixed
            delete objuser.password;
            res.status(200).json({
                success: true,
                message: "User logged in successfully",
                user: objuser
            });
        }
        else {
            const token = jwt.sign({
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                id: user._id,
            }, process.env.JWT_SECRET, { expiresIn: "10h" });
            res.cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
                path: "/"
            });
            const newUser = user.toObject();
            delete newUser.password;
            res.status(200).json({
                success: true,
                message: "User logged in successfully",
                user: newUser
            });
        }

    } catch (error) {
        next(handleError(500, "Internal Server Error by google login"));
    }
}


export const logout = async (req, res, next) => {
    try {
        res.clearCookie("access_token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            path: "/"
        })
        res.status(200).json({
            success: true,
            message: "User logged Out in successfully"
        });

    } catch (error) {

        next(handleError(500, error.message +"mj"))
    }

}