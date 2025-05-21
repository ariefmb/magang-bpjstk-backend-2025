import mongoose from "mongoose";
import { reportMenteeInterface } from "../interfaces/programTracker.interface";

const reportMenteeSchema = new mongoose.Schema<reportMenteeInterface>(
    {
        feedbackMentor_id: { type: String, required: true, unique: true },
        applicant_id: { type: String, required: true },
        vacancy_id: { type: String, required: true },
        logbook: { type: String, required: true },
        feedback_mentee: { type: String, required: true },
        status: { type: String, enum: ["Submitted", "Overdue", "Waiting"], default: "Waiting" },
        feedback_mentor: { type: [String], default: [] },
    },
    { timestamps: true }
);

const reportMenteeModel = mongoose.model<reportMenteeInterface>("feedbackMentor", reportMenteeSchema);

export default reportMenteeModel;
