import Joi from "joi";
import { VacancyInterface } from "../interfaces/vacancy.interface";

export const createVacancyValidation = (payload: VacancyInterface) => {
    const Schema = Joi.object({
        vacancy_id: Joi.string().required(),
        name_vacancy: Joi.string().trim().required(),
        unit: Joi.string().trim().required(),
        status: Joi.string().valid("Open", "open", "Closed", "closed", "Pending", "pending"),
        mentor_name: Joi.string().trim().required(),
        contact: Joi.string().required(),
        position: Joi.string().trim().required(),
        quota: Joi.number().min(1).default(1).required(),
        duration: Joi.number().min(1).default(1).required(),
        working_model: Joi.string()
            .valid("Work At Office", "work at office", "Work From Home", "work from home")
            .default("Work At Office"),
        open_vacancy: Joi.date().default(Date.now),
        close_vacancy: Joi.date().required(),
        description: Joi.string().allow("").optional(),
    });

    return Schema.validate(payload);
};
