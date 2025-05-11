import Joi from "joi";
import { requestVacancyInterface } from "src/interfaces/requestVacancy.interface";
import { VacancyInterface } from "../interfaces/vacancy.interface";

export const createVacancyValidation = (payload: VacancyInterface) => {
    const Schema = Joi.object({
        vacancy_id: Joi.string().required(),
        title: Joi.string().trim().required(),
        unit: Joi.string().trim().required(),
        status: Joi.string().valid(
            "Open",
            "open",
            "Closed",
            "closed",
            "Pending",
            "pending"
        ),
        mentor_name: Joi.string().trim().required(),
        contact: Joi.string().required(),
        position: Joi.string().trim().required(),
        quota: Joi.number().min(1).default(1).required(),
        tw: Joi.number(),
        duration: Joi.number().min(1).default(1).required(),
        city: Joi.string().required(),
        working_model: Joi.string()
            .valid(
                "Work At Office",
                "work at office",
                "Work From Home",
                "work from home"
            )
            .default("Work At Office"),
        open_vacancy: Joi.date().default(Date.now),
        close_vacancy: Joi.date().required(),
        description: Joi.string().allow("").optional(),
    });

    return Schema.validate(payload);
};

export const updateVacancyValidation = (payload: VacancyInterface) => {
    const Schema = Joi.object({
        title: Joi.string().trim(),
        unit: Joi.string().trim(),
        status: Joi.string().valid(
            "Open",
            "open",
            "Closed",
            "closed",
            "Pending",
            "pending"
        ),
        mentor_name: Joi.string().trim(),
        contact: Joi.string(),
        position: Joi.string().trim(),
        quota: Joi.number().min(1),
        tw: Joi.number(),
        duration: Joi.number().min(1),
        city: Joi.string(),
        working_model: Joi.string().valid(
            "Work At Office",
            "work at office",
            "Work From Home",
            "work from home"
        ),
        open_vacancy: Joi.date(),
        close_vacancy: Joi.date(),
        description: Joi.string().allow("").optional(),
    });

    return Schema.validate(payload);
};

export const approvalReqVacancyValidation = (
    payload: requestVacancyInterface
) => {
    const Schema = Joi.object({
        status: Joi.string()
            .valid(
                "Approved",
                "approved",
                "Rejected",
                "rejected",
                "Waiting",
                "waiting"
            )
            .required(),
        quotaGiven: Joi.number().required(),
    });

    return Schema.validate(payload);
};
