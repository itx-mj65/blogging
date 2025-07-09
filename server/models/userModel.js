import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/dzqj1xk2h/image/upload/v1735681234/avatars/default-avatar.png",
    },
    bio: {
        type: String,
        default: "This is my bio",
        trim: true,
    },
}, { timestamps: true });

const User = mongoose.model("user", userSchema);
export default User;
