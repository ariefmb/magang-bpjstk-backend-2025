import Joi from "joi";
import { OTPInterface } from "../interfaces/otp.interface";

export const sendOTPValidation = (payload: OTPInterface) => {
    const schema = Joi.object({
        otp_id: Joi.string().required(),
        email: Joi.string().email().lowercase().trim().required(),
        otp: Joi.string().required().required(),
        createdAt: Joi.date().required().default(Date.now),
    });

    return schema.validate(payload);
};
