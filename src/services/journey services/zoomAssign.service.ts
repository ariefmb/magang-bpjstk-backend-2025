import { zoomAssignInterface } from "../../interfaces/journeySetting.interface";
import zoomAssignModel from "../../models/journey models/zoomAssign.model";

export const assignZoomRepo = async (payload: zoomAssignInterface) => {
    return await zoomAssignModel.create(payload);
};

export const getAllAssignZoomsRepo = async () => {
    return await zoomAssignModel.find().populate([
        {
            path: "program_id",
            model: "program",
            localField: "program",
            foreignField: "program_id",
            justOne: true,
            select: "-_id program_id unit mentor_name position duration",
        },
        {
            path: "applicant_id",
            model: "applicant",
            localField: "applicant_id",
            foreignField: "applicant_id",
            justOne: true,
            select: "-_id applicant_id name email contact institution major semester",
        },
    ]);
};

export const getAssignZoomByIdRepo = async (id: string) => {
    return await zoomAssignModel.findOne({ zoomAssign_id: id }).populate([
        {
            path: "program_id",
            model: "program",
            localField: "program",
            foreignField: "program_id",
            justOne: true,
            select: "-_id program_id unit mentor_name position duration",
        },
        {
            path: "applicant_id",
            model: "applicant",
            localField: "applicant_id",
            foreignField: "applicant_id",
            justOne: true,
            select: "-_id applicant_id name email contact institution major semester",
        },
    ]);
};

export const updateAssignZoomRepo = async (id: string, payload: zoomAssignInterface) => {
    return await zoomAssignModel.findOneAndUpdate({ zoomAssign_id: id }, { $set: payload });
};

export const deleteAssignZoomRepo = async (id: string) => {
    return await zoomAssignModel.findOneAndDelete({ zoomAssign_id: id });
};
