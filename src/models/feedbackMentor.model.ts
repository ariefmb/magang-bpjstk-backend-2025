import mongoose from "mongoose";
import { feedbackMentorInterface } from "../interfaces/programTracker.interface";

const feedbackMentorSchema = new mongoose.Schema<feedbackMentorInterface>(
    {
        feedbackMentor_id: { type: String, required: true, unique: true },
        applicant_id: { type: String, required: true },
        logbook: { type: String, required: true },
        feedback: { type: String, required: true },
    },
    { timestamps: true }
);

const feedbackMentorModel = mongoose.model<feedbackMentorInterface>("feedbackMentor", feedbackMentorSchema);

export default feedbackMentorModel;
