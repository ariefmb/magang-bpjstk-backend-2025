import mongoose from "mongoose";
import { OTPInterface } from "../interfaces/otp.interface";

const OTPSchema = new mongoose.Schema<OTPInterface>({
    otp_id: { type: String, required: true, unique: true },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 60 * 5 },
});

const OTPModel = mongoose.model<OTPInterface>("OTP", OTPSchema);

export default OTPModel;
