import Joi from "joi";
import { UserInterface, UserSessionInterface } from "src/interfaces/user.interface";

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

export const createSessionValidation = (payload: UserSessionInterface) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });

    return schema.validate(payload);
};
