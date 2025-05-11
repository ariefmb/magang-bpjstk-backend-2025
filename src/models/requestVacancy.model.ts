import mongoose from "mongoose";
import { requestVacancyInterface } from "../interfaces/requestVacancy.interface";

const reqVacancySchema = new mongoose.Schema<requestVacancyInterface>(
    {
        reqVacancy_id: {
            type: String,
            required: true,
            unique: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            required: true,
            enum: [
                "Approved",
                "approved",
                "Rejected",
                "rejected",
                "Waiting",
                "waiting",
            ],
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
        working_model: {
            type: String,
            required: true,
            enum: [
                "Work At Office",
                "work at office",
                "Work From Home",
                "work from home",
            ],
            default: "Work At Office",
        },
        open_vacancy: {
            type: Date,
            required: true,
            default: Date.now,
        },
        close_vacancy: {
            type: Date,
            required: true,
            default: Date.now,
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

const reqVacancyModel = mongoose.model<requestVacancyInterface>(
    "request_vacancy",
    reqVacancySchema
);

export default reqVacancyModel;
