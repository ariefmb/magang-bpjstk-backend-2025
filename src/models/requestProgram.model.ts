import mongoose from "mongoose";
import { requestProgramInterface } from "../interfaces/requestProgram.interface";

const reqProgramSchema = new mongoose.Schema<requestProgramInterface>(
    {
        reqProgram_id: {
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
            enum: ["Approved", "Rejected", "Waiting"],
            default: "Waiting",
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
        quotaGiven: {
            type: Number,
        },
    },
    { timestamps: true }
);

const reqProgramModel = mongoose.model<requestProgramInterface>("request_program", reqProgramSchema);

export default reqProgramModel;
