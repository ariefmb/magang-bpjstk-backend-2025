import Joi from "joi";
import { programTrackerInterface } from "../../interfaces/programTracker.interface";

export const createAdministrationInterviewValidation = (payload: programTrackerInterface) => {
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
        location: Joi.string().required(),
        journey: Joi.string()
            .valid("Administration", "Interview", "Offering", "Confirmation", "Working Experience", "Graduation")
            .required(),
        start_date: Joi.date().required(),
        end_date: Joi.date().required(),
    });

    return Schema.validate(payload);
};

export const updateAdministrationInterviewValidation = (payload: programTrackerInterface) => {
    const Schema = Joi.object({
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
    });

    return Schema.validate(payload);
};
