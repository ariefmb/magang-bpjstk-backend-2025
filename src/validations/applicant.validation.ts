import Joi from "joi";
import { ApplicantInterface } from "../interfaces/applicant.interface";

export const addApplicantValidation = (payload: ApplicantInterface) => {
    const Schema = Joi.object({
        applicant_id: Joi.string().required(),
        name: Joi.string().trim().required(),
        nik: Joi.string().trim().required(),
        email: Joi.string().email().lowercase().trim().required(),
        contact: Joi.string().required(),
        institution: Joi.string().required(),
        major: Joi.string().required(),
        semester: Joi.number().default(1).required(),
        no_suratPengantar: Joi.string().required(),
        journey: Joi.string()
            .valid(
                "Administration",
                "Interview",
                "Offering",
                "Confirmation",
                "Working Experience",
                "Graduation"
            )
            .default("Administration"),
        status: Joi.string()
            .valid("Approved", "Rejected", "On Going", "Waiting")
            .default("Waiting"),
    });

    return Schema.validate(payload);
};
