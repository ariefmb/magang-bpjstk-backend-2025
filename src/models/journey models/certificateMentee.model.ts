import mongoose from "mongoose";
import { certificateMenteeInterface } from "../../interfaces/journeySetting.interface";

const certificateMenteeSchema = new mongoose.Schema<certificateMenteeInterface>(
    {
        certificateMentee_id: {
            type: String,
            required: true,
            unique: true,
        },
        vacancy_id: {
            type: String,
            ref: "vacancy",
            required: true,
        },
        applicant_id: {
            type: String,
            ref: "applicant",
            required: true,
        },
        certificate: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const certificateMenteeModel = mongoose.model<certificateMenteeInterface>(
    "certificate_mentee",
    certificateMenteeSchema
);

export default certificateMenteeModel;
