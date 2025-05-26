import Joi from "joi";
import { requestProgramInterface } from "../interfaces/requestProgram.interface";

export const requestProgramValidation = (payload: requestProgramInterface) => {
    const Schema = Joi.object({
        reqProgram_id: Joi.string().required(),
        user_id: Joi.string().required(),
        title: Joi.string().trim().required(),
        status: Joi.string().valid("Approved", "Rejected", "Waiting").default("Waiting"),
        unit: Joi.string().trim().required(),
        mentor_name: Joi.string().trim().required(),
        mentor_email: Joi.string().email().lowercase().trim().required(),
        contact: Joi.string().required(),
        position: Joi.string().trim().required(),
        quota: Joi.number().required().min(1).default(1),
        tw: Joi.number(),
        duration: Joi.number().required().min(1).default(1),
        city: Joi.string().required(),
        location: Joi.string().required(),
        working_model: Joi.string()
            .valid("Work At Office", "work at office", "Work From Home", "work from home")
            .default("Work At Office"),
        start_date: Joi.date().required().default(Date.now),
        end_date: Joi.date().required(),
        description: Joi.string().optional().default(""),
    });

    return Schema.validate(payload);
};

export const updateRequestProgramValidation = (payload: requestProgramInterface) => {
    const Schema = Joi.object({
        title: Joi.string().trim(),
        status: Joi.string().valid("Approved", "Rejected", "Waiting"),
        unit: Joi.string().trim(),
        mentor_name: Joi.string().trim(),
        mentor_email: Joi.string().email().lowercase().trim(),
        contact: Joi.string(),
        position: Joi.string().trim(),
        quota: Joi.number().min(1),
        tw: Joi.number(),
        duration: Joi.number().min(1),
        city: Joi.string(),
        location: Joi.string(),
        working_model: Joi.string().valid("Work At Office", "work at office", "Work From Home", "work from home"),
        start_date: Joi.date(),
        end_date: Joi.date(),
        description: Joi.string(),
    });

    return Schema.validate(payload);
};
