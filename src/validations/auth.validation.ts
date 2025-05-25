import Joi from "joi";
import { resetPasswordInterface, UserInterface } from "../interfaces/user.interface";

export const createUserValidation = (payload: UserInterface) => {
    const schema = Joi.object({
        user_id: Joi.string().required(),
        email: Joi.string().email().lowercase().trim().required(),
        name: Joi.string().trim().required(),
        contact: Joi.string().required(),
        password: Joi.string().required(),
        role: Joi.string().valid("super admin", "admin", "mentor", "mentee").lowercase().default("mentee"),
        verified: Joi.boolean().default(false),
    });

    return schema.validate(payload);
};

export const createSessionValidation = (payload: UserInterface) => {
    const schema = Joi.object({
        email: Joi.string().email().lowercase().trim().required(),
        password: Joi.string().required(),
    });

    return schema.validate(payload);
};

export const refreshSessionValidation = (payload: UserInterface) => {
    const schema = Joi.object({
        refreshToken: Joi.string().required(),
    });

    return schema.validate(payload);
};

export const requestForgotPasswordValidation = (email: string) => {
    const schema = Joi.object({
        email: Joi.string().email().lowercase().trim().required(),
    });

    return schema.validate({ email });
};

export const resetPasswordValidation = (payload: resetPasswordInterface) => {
    const schema = Joi.object({
        email: Joi.string().email().lowercase().trim().required(),
        password: Joi.string().required(),
        otp: Joi.string().required(),
    });

    return schema.validate(payload);
};

export const updateUserValidation = (payload: UserInterface) => {
    const schema = Joi.object({
        email: Joi.string().email().lowercase().trim(),
        name: Joi.string().trim(),
        contact: Joi.string(),
        password: Joi.string(),
        role: Joi.string().valid("super admin", "admin", "mentor", "mentee").lowercase(),
        verified: Joi.boolean(),
    });

    return schema.validate(payload);
};
