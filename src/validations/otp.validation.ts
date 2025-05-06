import Joi from "joi";
import { OTPInterface } from "../interfaces/otp.interface";

export const sendOTPValidation = (payload: OTPInterface) => {
    const schema = Joi.object({
        otp_id: Joi.string().required(),
        email: Joi.string().email().lowercase().trim().required(),
        otp: Joi.string().required(),
        createdAt: Joi.date().default(Date.now),
    });

    return schema.validate(payload);
};

export const verifyOTPValidation = (payload: OTPInterface) => {
    const schema = Joi.object({
        email: Joi.string().email().lowercase().trim().required(),
        otp: Joi.string().required(),
    });

    return schema.validate(payload);
};