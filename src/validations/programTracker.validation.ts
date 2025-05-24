import Joi from "joi";
import { programTrackerInterface } from "../interfaces/programTracker.interface";

export const createProgramTrackerValidation = (payload: programTrackerInterface) => {
    const Schema = Joi.object({
        programTracker_id: Joi.string().required(),
        vacancy_id: Joi.string().required(),
        unit: Joi.string().trim().required(),
        mentor_name: Joi.string().trim().required(),
        contact: Joi.string().required(),
        working_model: Joi.string()
            .valid("Work At Office", "work at office", "Work From Home", "work from home")
            .default("Work At Office"),
        city: Joi.string().required(),
        location: Joi.string().default(""),
        journey: Joi.string()
            .valid("Administration", "Interview", "Offering", "Confirmation", "Working Experience", "Graduation")
            .default("Administration"),
        start_date: Joi.date().required(),
        end_date: Joi.date().required(),
    });

    return Schema.validate(payload);
};

const baseSchema = {
    unit: Joi.string().trim(),
    mentor_name: Joi.string().trim(),
    contact: Joi.string(),
    working_model: Joi.string().valid("Work At Office", "work at office", "Work From Home", "work from home"),
    city: Joi.string(),
    location: Joi.string(),
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
};

export const updateProgramTrackerValidation = (payload: programTrackerInterface, journey?: string) => {
    let additionalSchema = {};

    if (journey === "Offering") additionalSchema = { onBoarding_date: Joi.date().required() };
    if (journey === "Confirmation")
        additionalSchema = {
            template_suratPerjanjian: Joi.string().required(),
            template_suratPeminjamanIDCard: Joi.string().required(),
            template_logbook: Joi.string().required(),
            template_laporan: Joi.string().required(),
            link_group: Joi.string().required(),
        };

    const Schema = Joi.object({
        ...baseSchema,
        ...additionalSchema,
    });

    return Schema.validate(payload);
};
