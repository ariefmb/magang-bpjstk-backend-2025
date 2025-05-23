import { reportMenteeInterface } from "../../interfaces/journeySetting.interface";
import reportMenteeModel from "../../models/journey models/reportMentee.model";

export const reportMenteeRepo = async (payload: reportMenteeInterface) => {
    return await reportMenteeModel.create(payload);
};

export const getAllReportMenteesRepo = async () => {
    return await reportMenteeModel.find().populate([
        {
            path: "vacancy_id",
            model: "vacancy",
            localField: "vacancy",
            foreignField: "vacancy_id",
            justOne: true,
            select: "-_id vacancy_id unit mentor_name position duration",
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

export const getReportMenteeByIdRepo = async (id: string) => {
    return await reportMenteeModel.findOne({ reportMentee_id: id }).populate([
        {
            path: "vacancy_id",
            model: "vacancy",
            localField: "vacancy",
            foreignField: "vacancy_id",
            justOne: true,
            select: "-_id vacancy_id unit mentor_name position duration",
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

export const updateReportMenteeRepo = async (id: string, payload: reportMenteeInterface) => {
    return await reportMenteeModel.findOneAndUpdate({ reportMentee_id: id }, { $set: payload });
};

export const deleteReportMenteeRepo = async (id: string) => {
    return await reportMenteeModel.findOneAndDelete({ reportMentee_id: id });
};
