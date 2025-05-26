import mongoose from "mongoose";
import { ProgramInterface } from "../interfaces/program.interface";

const programSchema = new mongoose.Schema<ProgramInterface>(
    {
        program_id: {
            type: String,
            required: true,
            unique: true,
        },
        user_id: {
            type: String,
            ref: "user",
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            required: true,
            enum: ["Active", "Finished", "Pending"],
        },
        unit: {
            type: String,
            required: true,
            trim: true,
        },
        mentor_name: {
            type: String,
            required: true,
            trim: true,
        },
        mentor_email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        contact: {
            type: String,
            required: true,
        },
        position: {
            type: String,
            required: true,
            trim: true,
        },
        quota: {
            type: Number,
            required: true,
            min: 1,
            default: 1,
        },
        tw: {
            type: Number,
        },
        duration: {
            type: Number,
            required: true,
            min: 1,
            default: 1,
        },
        city: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        working_model: {
            type: String,
            required: true,
            enum: ["Work At Office", "Work From Home"],
            default: "Work At Office",
        },
        journey: {
            type: String,
            required: true,
            enum: ["Administration", "Interview", "Offering", "Confirmation", "Working Experience", "Graduation"],
            default: "Administration",
        },
        start_date: {
            type: Date,
            required: true,
            default: Date.now,
        },
        end_date: {
            type: Date,
            required: true,
        },
        description: {
            type: String,
            trim: true,
        },
        onBoarding_date: {
            type: Date,
            default: "",
        },
        template_suratPerjanjian: {
            type: String,
            default: "",
        },
        template_suratPeminjamanIDCard: {
            type: String,
            default: "",
        },
        template_logbook: {
            type: String,
            default: "",
        },
        template_finalReport: {
            type: String,
            default: "",
        },
        link_group: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

const programModel = mongoose.model<ProgramInterface>("program", programSchema);

export default programModel;
