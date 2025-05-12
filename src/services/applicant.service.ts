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
        throw new Error(`Invalid file extensions: ${file.originalname} must be ${allowedExtes}`);
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
