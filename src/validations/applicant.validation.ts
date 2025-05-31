import Joi from "joi";
import { ApplicantInterface } from "../interfaces/applicant.interface";

export const addApplicantValidation = (payload: ApplicantInterface) => {
    const Schema = Joi.object({
        applicant_id: Joi.string().required(),
        program_id: Joi.string().required(),
        user_id: Joi.string().required(),
        name: Joi.string().trim().required(),
        nik: Joi.string().trim().required(),
        email: Joi.string().email().lowercase().trim().required(),
        contact: Joi.string().required(),
        institution: Joi.string().required(),
        major: Joi.string().required(),
        semester: Joi.number().default(1).required(),
        no_suratPengantar: Joi.string().required(),
        journey: Joi.string()
            .valid("Administration", "Interview", "Offering", "Confirmation", "Working Experience", "Graduation")
            .default("Administration"),
        status: Joi.string().valid("Approved", "Rejected", "On Going", "Waiting", "Off Boarding").default("Waiting"),
    });

    return Schema.validate(payload);
};

const baseSchema = {
    name: Joi.string().trim(),
    nik: Joi.string().trim(),
    email: Joi.string().email().lowercase().trim(),
    contact: Joi.string(),
    institution: Joi.string(),
    major: Joi.string(),
    semester: Joi.number().default(1),
    no_suratPengantar: Joi.string(),
    journey: Joi.string().valid(
        "Administration",
        "Interview",
        "Offering",
        "Confirmation",
        "Working Experience",
        "Graduation"
    ),
    status: Joi.string().valid("Approved", "Rejected", "On Going", "Waiting").default("Waiting"),
};

export const updateApplicantValidation = (payload: ApplicantInterface, journey?: string) => {
    let additionalSchema = {};

    if (journey === "Confirmation") {
        additionalSchema = {
            no_rekening: Joi.string().trim().required(),
            nama_bukuRek: Joi.string().required(),
            bank: Joi.string().required(),
        };
    } else {
        additionalSchema = {
            no_rekening: Joi.string().trim(),
            nama_bukuRek: Joi.string(),
            bank: Joi.string(),
        };
    }

    const Schema = Joi.object({
        ...baseSchema,
        ...additionalSchema,
    });

    return Schema.validate(payload);
};

export const approvalJourneyMenteeValidation = (payload: ApplicantInterface) => {
    const Schema = Joi.object({
        status: Joi.string().required().valid("Approved", "Rejected"),
    });

    return Schema.validate(payload);
};
