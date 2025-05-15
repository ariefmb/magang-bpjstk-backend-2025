import fs from "fs";
import CONFIG from "../config/environment";
import { ApplicantInterface } from "../interfaces/applicant.interface";
import applicantModel from "../models/applicant.model";
import { uploadToDrive } from "../utils/uploadToDrive";
import { validateFileExtensions } from "../utils/validateFileExt";

export const addApplicantRepo = async (payload: ApplicantInterface) => {
    return await applicantModel.create(payload);
};

export const uploadAndDelete = async (
    file: Express.Multer.File,
    allowedExtes: string[]
) => {
    if (!validateFileExtensions(file, allowedExtes)) {
        throw new Error(
            `Invalid file extensions: ${file.originalname} must be ${allowedExtes}`
        );
    }
    const uploaded = await uploadToDrive(
        file.path,
        file.originalname,
        file.mimetype,
        CONFIG.google_drive_folder_id
    );
    fs.unlinkSync(file.path);
    return uploaded.webViewLink || uploaded.webContentLink || "";
};

export const getApplicantsRepo = async () => {
    return await applicantModel.find();
};

export const getApplicantByIdRepo = async (id: string) => {
    return await applicantModel.findOne({ applicant_id: id });
};

export const searchApplicantsRepo = async (name: string) => {
    return await applicantModel.find({
        name: { $regex: name, $options: "i" },
    });
};

export const updateApplicantRepo = async (
    id: string,
    payload: ApplicantInterface
) => {
    return await applicantModel.findOneAndUpdate(
        { applicant_id: id },
        { $set: payload }
    );
};

export const deleteApplicantRepo = async (id: string) => {
    return await applicantModel.findOneAndDelete({ applicant_id: id });
};

export const getApplicantsByEmailRepo = async (email: string) => {
    return await applicantModel.find({ email: { $regex: email } });
};
