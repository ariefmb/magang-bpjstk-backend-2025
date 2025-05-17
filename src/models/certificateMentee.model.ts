import mongoose from "mongoose";
import { certificateMenteeInterface } from "../interfaces/programTracker.interface";

const certificateMenteeSchema = new mongoose.Schema<certificateMenteeInterface>(
    {
        certificateMentee_id: { type: String, required: true, unique: true },
        applicant_id: { type: String, required: true },
        certificate: { type: String, required: true },
    },
    { timestamps: true }
);

const certificateMentorModel = mongoose.model<certificateMenteeInterface>("certificateMentee", certificateMenteeSchema);

export default certificateMentorModel;
