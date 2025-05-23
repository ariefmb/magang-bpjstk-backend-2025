import Joi from "joi";
import { zoomAssignInterface } from "../../interfaces/journeySetting.interface";

export const assignZoomValidation = (payload: zoomAssignInterface) => {
    const Schema = Joi.object({
        zoomAssign_id: Joi.string().required(),
        vacancy_id: Joi.string().required(),
        applicant_id: Joi.string().required(),
        place: Joi.string().required(),
        datetime: Joi.date().required(),
        link: Joi.string().uri().default(""),
    });

    return Schema.validate(payload);
};

export const updateAssignZoomValidation = (payload: zoomAssignInterface) => {
    const Schema = Joi.object({
        place: Joi.string(),
        datetime: Joi.date(),
        link: Joi.string().uri(),
    });

    return Schema.validate(payload);
};
