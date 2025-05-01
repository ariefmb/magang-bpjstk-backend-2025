import Joi from "joi";
import {
    UserInterface,
    UserSessionInterface,
} from "src/interfaces/user.interface";

export const createUserValidation = (payload: UserInterface) => {
    const schema = Joi.object({
        user_id: Joi.string().required(),
        email: Joi.string().email().required(),
        name: Joi.string().required(),
        password: Joi.string().required(),
        role: Joi.string().allow("", null),
    });

    return schema.validate(payload);
};

export const createSessionValidation = (payload: UserInterface) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
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
        email: Joi.string().email().allow("", null),
        name: Joi.string().allow("", null),
        password: Joi.string().allow("", null),
        role: Joi.string().allow("", null),
    });

    return schema.validate(payload);
};
