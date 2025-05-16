import mongoose from "mongoose";
import { ApplicantInterface } from "../interfaces/applicant.interface";

const applicantSchema = new mongoose.Schema<ApplicantInterface>(
    {
        applicant_id: { type: String, required: true, unique: true },
        vacancy_id: { type: String, required: true, unique: true },
        name: { type: String, required: true, trim: true },
        nik: { type: String, required: true, trim: true },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        contact: { type: String, required: true },
        photo: { type: String, required: true },
        institution: { type: String, required: true },
        major: { type: String, required: true },
        semester: { type: Number, required: true, default: 1 },
        no_suratPengantar: { type: String, required: true },
        suratPengantar: { type: String, required: true },
        cv: { type: String, required: true },
        portfolio: { type: String, required: true },
        journey: {
            type: String,
            enum: [
                "Administration",
                "Interview",
                "Offering",
                "Confirmation",
                "Working Experience",
                "Graduation",
            ],
            default: "Administration",
            required: true,
        },
        status: {
            type: String,
            enum: [
                "Approved",
                "Rejected",
                "On Going",
                "Waiting",
                "Off Boarding",
            ],
            default: "Waiting",
            required: true,
        },
    },
    { timestamps: true }
);

const applicantModel = mongoose.model<ApplicantInterface>(
    "applicant",
    applicantSchema
);

export default applicantModel;
