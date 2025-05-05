import Joi from "joi";
import { UserInterface } from "../interfaces/user.interface";

export const createUserValidation = (payload: UserInterface) => {
    const schema = Joi.object({
        user_id: Joi.string().required(),
        email: Joi.string().email().lowercase().trim().required(),
        name: Joi.string().trim().required(),
        password: Joi.string().required(),
        role: Joi.string()
            .valid("super admin", "admin", "mentor", "mentee")
            .lowercase()
            .default("mentee"),
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

export const updateUserValidation = (payload: UserInterface) => {
    const schema = Joi.object({
        email: Joi.string().email().lowercase().trim(),
        name: Joi.string().trim(),
        password: Joi.string(),
        role: Joi.string()
            .valid("super admin", "admin", "mentor", "mentee")
            .lowercase(),
    });

    return schema.validate(payload);
};
