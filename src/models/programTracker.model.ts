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
            enum: ["Administration", "Interview", "Offering", "Confirmation", "Working Experience", "Graduation"],
            required: true,
        },
        start_date: { type: Date, required: true, default: Date.now },
        end_date: { type: Date, required: true },
        onBoarding_date: { type: Date, required: true },
        template_suratPerjanjian: { type: String, required: true },
        template_suratPeminjamanIDCard: { type: String, required: true },
        template_logbook: { type: String, required: true },
        template_laporan: { type: String, required: true },
        link_group: { type: String, required: true },
    },
    { timestamps: true }
);

const programTrackerModel = mongoose.model<programTrackerInterface>("programTracker", programTrackerSchema);

export default programTrackerModel;
