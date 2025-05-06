import { OTPInterface } from "../interfaces/otp.interface";
import OTPModel from "../models/otp.model";

export const createOTPRepo = async (payload: OTPInterface) => {
    return await OTPModel.create(payload);
};

export const findMatchOTP = async (email: string) => {
    return await OTPModel.findOne({ email: email });
};

export const deleteOTPRepo = async (email: string) => {
    return await OTPModel.findOneAndDelete({ email: email });
};
