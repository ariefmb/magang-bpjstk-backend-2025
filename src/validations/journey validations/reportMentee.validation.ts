import Joi from "joi";
import { reportMenteeInterface } from "../../interfaces/journeySetting.interface";

export const reportMenteeValidation = (payload: reportMenteeInterface) => {
    const Schema = Joi.object({
        reportMentee_id: Joi.string().required(),
        vacancy_id: Joi.string().required(),
        applicant_id: Joi.string().required(),
        title: Joi.string().required(),
        report: Joi.string().uri().default(""),
        feedback_mentee: Joi.string().default(""),
        feedback_to_mentor: Joi.string().default(""),
        status: Joi.string().valid("Submitted", "Overdue", "Waiting").default("Waiting"),
        feedback_mentor: Joi.array().items(Joi.string()).default([]),
    });

    return Schema.validate(payload);
};

export const updateReportMenteeValidation = (payload: reportMenteeInterface) => {
    const Schema = Joi.object({
        title: Joi.string(),
        report: Joi.string().uri(),
        feedback_mentee: Joi.string(),
        feedback_to_mentor: Joi.string().default(""),
        status: Joi.string().valid("Submitted", "Overdue", "Waiting"),
        feedback_mentor: Joi.array().items(Joi.string()),
    });

    return Schema.validate(payload);
};
