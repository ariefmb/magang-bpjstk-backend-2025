import Joi from "joi";
import { ProgramInterface } from "../interfaces/program.interface";

export const createProgramValidation = (payload: ProgramInterface) => {
    const Schema = Joi.object({
        program_id: Joi.string().required(),
        title: Joi.string().required().trim(),
        status: Joi.string().valid("Active", "Finished", "Pending"),
        unit: Joi.string().required().trim(),
        mentor_name: Joi.string().required().trim(),
        mentor_email: Joi.string().email().required().lowercase().trim(),
        contact: Joi.string().required(),
        position: Joi.string().required().trim(),
        quota: Joi.number().required().min(1).default(1),
        duration: Joi.number().required().min(1).default(1),
        city: Joi.string().required(),
        location: Joi.string().required(),
        working_model: Joi.string().valid("Work At Office", "Work From Home").default("Work At Office"),
        journey: Joi.string().valid("Administration", "Interview", "Offering", "Confirmation", "Working Experience", "Graduation").default("Administration"),
        start_date: Joi.date().required().default(Date.now),
        end_date: Joi.date().required(),
    });

    return Schema.validate(payload);
};

export const updateProgramValidation = (payload: ProgramInterface) => {
    const Schema = Joi.object({});

    return Schema.validate(payload);
};

export const approvalReqProgramValidation = (payload: ProgramInterface) => {
    const Schema = Joi.object({
        status: Joi.string().valid("Approved", "approved", "Rejected", "rejected", "Waiting", "waiting").required(),
        quotaGiven: Joi.number().required(),
    });

    return Schema.validate(payload);
};
