import Joi from "joi";
import { certificateMenteeInterface } from "../../interfaces/journeySetting.interface";

export const addCertificateMenteeValidation = (payload: certificateMenteeInterface) => {
    const Schema = Joi.object({
        certificateMentee_id: Joi.string().required(),
        program_id: Joi.string().required(),
        applicant_id: Joi.string().required(),
    });

    return Schema.validate(payload);
};
