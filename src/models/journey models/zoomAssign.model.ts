import mongoose from "mongoose";
import { zoomAssignInterface } from "../../interfaces/journeySetting.interface";

const zoomAssignSchema = new mongoose.Schema<zoomAssignInterface>(
    {
        zoomAssign_id: {
            type: String,
            required: true,
            unique: true,
        },
        program_id: {
            type: String,
            ref: "program",
            required: true,
        },
        applicant_id: {
            type: String,
            ref: "applicant",
            required: true,
        },
        place: {
            type: String,
            required: true,
        },
        datetime: {
            type: Date,
            required: true,
        },
        link: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

const zoomAssignModel = mongoose.model<zoomAssignInterface>("zoom_assign", zoomAssignSchema);

export default zoomAssignModel;
