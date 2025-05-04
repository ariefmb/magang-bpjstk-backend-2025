import mongoose from "mongoose";
import { UserInterface } from "../interfaces/user.interface";

const userSchema = new mongoose.Schema<UserInterface>(
    {
        user_id: { type: String, required: true, unique: true },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        name: { type: String, required: true, trim: true },
        password: { type: String, required: true },
        role: {
            type: String,
            required: true,
            enum: ["super admin", "admin", "mentor", "mentee"],
            default: "mentee",
            lowercase: true,    
        },
    },
    { timestamps: true }
);

const userModel = mongoose.model<UserInterface>("user", userSchema);

export default userModel;
