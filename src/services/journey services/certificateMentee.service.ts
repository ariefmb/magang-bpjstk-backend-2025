import { certificateMenteeInterface } from "../../interfaces/journeySetting.interface";
import certificateMentorModel from "../../models/journey models/certificateMentee.model";

export const addCertificateMenteeRepo = async (payload: certificateMenteeInterface) => {
    return await certificateMentorModel.create(payload);
};

export const getAllCertificateMenteesRepo = async () => {
    return await certificateMentorModel.find().populate([
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

export const getCertificateMenteeByIdRepo = async (id: string) => {
    return await certificateMentorModel.findOne({ certificateMentee_id: id }).populate([
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

export const updateCertificateMenteeRepo = async (id: string, payload: certificateMenteeInterface) => {
    return await certificateMentorModel.findOneAndUpdate({ certificateMentee_id: id }, { $set: payload });
};

export const deleteCertificateMenteeRepo = async (id: string) => {
    return await certificateMentorModel.findOneAndDelete({ certificateMentee_id: id });
};
