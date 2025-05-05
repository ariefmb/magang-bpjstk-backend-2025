import { OTPInterface } from "../interfaces/otp.interface";
import OTPModel from "../models/otp.model";

export const createOTPRepo = async (payload: OTPInterface) => {
    return await OTPModel.create(payload);
};
