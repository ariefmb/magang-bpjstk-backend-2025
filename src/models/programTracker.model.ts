import mongoose from "mongoose";
import { programTrackerInterface } from "../interfaces/programTracker.interface";

const programTrackerSchema = new mongoose.Schema<programTrackerInterface>(
    {
        programTracker_id: { type: String, required: true, unique: true },
        vacancy_id: { type: String, required: true, unique: true },
        unit: { type: String, required: true, trim: true },
        mentor_name: { type: String, required: true, trim: true },
        contact: { type: String, required: true },
        working_model: {
            type: String,
            required: true,
            enum: ["Work At Office", "work at office", "Work From Home", "work from home"],
            default: "Work At Office",
        },
        city: { type: String, required: true },
        location: { type: String, required: true },
        journey: {
            type: String,
            required: true,
            enum: ["Administration", "Interview", "Offering", "Confirmation", "Working Experience", "Graduation"],
            default: "Administration"
        },
        start_date: { type: Date, required: true },
        end_date: { type: Date, required: true },
        onBoarding_date: { type: Date, default: "" },
        template_suratPerjanjian: { type: String, default: "" },
        template_suratPeminjamanIDCard: { type: String, default: "" },
        template_logbook: { type: String, default: "" },
        template_laporan: { type: String, default: "" },
        link_group: { type: String, default: "" },
    },
    { timestamps: true }
);

const programTrackerModel = mongoose.model<programTrackerInterface>("program_tracker", programTrackerSchema);

export default programTrackerModel;
