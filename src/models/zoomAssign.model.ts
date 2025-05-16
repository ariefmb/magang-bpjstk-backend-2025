import mongoose from "mongoose";
import { zoomAssignInterface } from "../interfaces/programTracker.interface";

const zoomAssignSchema = new mongoose.Schema<zoomAssignInterface>(
    {
        zoomAssign_id: { type: String, required: true, unique: true },
        applicant_id: { type: String, required: true },
        place: { type: String, required: true },
        datetime: { type: Date, required: true },
        link: { type: String, required: true },
    },
    { timestamps: true }
);

const zoomAssignModel = mongoose.model<zoomAssignInterface>("zoomAssign", zoomAssignSchema);

export default zoomAssignModel;
