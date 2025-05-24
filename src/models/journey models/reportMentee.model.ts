import mongoose from "mongoose";
import { reportMenteeInterface } from "../../interfaces/journeySetting.interface";

const reportMenteeSchema = new mongoose.Schema<reportMenteeInterface>(
    {
        reportMentee_id: { type: String, required: true, unique: true },
        vacancy_id: { type: String, ref: "vacancy", required: true },
        applicant_id: { type: String, ref: "applicant", required: true },
        title: { type: String, required: true },
        report: { type: String, default: "" },
        feedback_mentee: { type: String, default: "" },
        feedback_to_mentor: { type: String, default: "" },
        status: { type: String, enum: ["Submitted", "Overdue", "Waiting"], default: "Waiting" },
        feedback_mentor: { type: [String], default: [] },
    },
    { timestamps: true }
);

const reportMenteeModel = mongoose.model<reportMenteeInterface>("report_mentee", reportMenteeSchema);

export default reportMenteeModel;
