import Joi from "joi";
import { requestVacancyInterface } from "../interfaces/requestVacancy.interface";
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
        journey: Joi.string()
            .valid("Administration", "Interview", "Offering", "Confirmation", "Working Experience", "Graduation")
            .default("Administration"),
        start_date: Joi.date().required().default(Date.now),
        end_date: Joi.date().required(),
        description: Joi.date().optional().default(""),
    });

    return Schema.validate(payload);
};

const baseSchema = {
    title: Joi.string().trim(),
    status: Joi.string().valid("Active", "Finished", "Pending"),
    unit: Joi.string().trim(),
    mentor_name: Joi.string().trim(),
    mentor_email: Joi.string().email().lowercase().trim(),
    contact: Joi.string(),
    position: Joi.string().trim(),
    quota: Joi.number().min(1),
    duration: Joi.number().min(1),
    city: Joi.string(),
    location: Joi.string(),
    working_model: Joi.string().valid("Work At Office", "Work From Home"),
    journey: Joi.string().valid(
        "Administration",
        "Interview",
        "Offering",
        "Confirmation",
        "Working Experience",
        "Graduation"
    ),
    start_date: Joi.date(),
    end_date: Joi.date(),
    description: Joi.date(),
};

export const updateProgramValidation = (payload: ProgramInterface, journey?: string) => {
    let additionalSchema = {};

    if (journey === "Offering") additionalSchema = { onBoarding_date: Joi.date().required() };
    if (journey === "Confirmation")
        additionalSchema = {
            template_suratPerjanjian: Joi.string().required(),
            template_suratPeminjamanIDCard: Joi.string().required(),
            template_logbook: Joi.string().required(),
            template_finalReport: Joi.string().required(),
            link_group: Joi.string().uri().required(),
        };

    const Schema = Joi.object({
        ...baseSchema,
        ...additionalSchema,
    });

    return Schema.validate(payload);
};

export const approvalReqProgramValidation = (payload: requestVacancyInterface) => {
    const Schema = Joi.object({
        status: Joi.string().valid("Approved", "approved", "Rejected", "rejected", "Waiting", "waiting").required(),
        quotaGiven: Joi.number().required(),
    });

    return Schema.validate(payload);
};
