import fs from "fs";
import { google } from "googleapis";
import path from "path";
import CONFIG from "../config/environment";
import { validateFileExtensions } from "./validateFileExt";

const KEYFILEPATH = path.join(__dirname, "../", CONFIG.google_drive_keyfile);
const SCOPES = ["https://www.googleapis.com/auth/drive.file"];

const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
});

const drive = google.drive({ version: "v3", auth });

const uploadToDrive = async (
    filePath: string,
    fileName: string,
    mimeType: string,
    parentFolderId?: string
) => {
    const fileMetaData = {
        name: fileName,
        ...(parentFolderId && { parents: [parentFolderId] }),
    };

    const media = {
        mimeType,
        body: fs.createReadStream(filePath),
    };

    const file = await drive.files.create({
        requestBody: fileMetaData,
        media,
        fields: "id, webViewLink, webContentLink",
    });

    const fileId = file.data.id;

    if (fileId) {
        await drive.permissions.create({
            fileId: fileId,
            requestBody: {
                role: "reader",
                type: "anyone",
            },
        });
    } else {
        throw new Error("File ID is undefined or null.");
    }

    const publicFile = await drive.files.get({
        fileId: fileId,
        fields: "id, webViewLink, webContentLink",
    });

    return publicFile.data;
};

export const uploadAndDelete = async (file: Express.Multer.File, allowedExtes: string[]) => {
    if (!validateFileExtensions(file, allowedExtes)) {
        throw new Error(`Invalid file extensions: ${file.originalname} must be ${allowedExtes}`);
    }
    const uploaded = await uploadToDrive(file.path, file.originalname, file.mimetype, CONFIG.google_drive_folder_id);
    fs.unlinkSync(file.path);
    return uploaded.webViewLink || uploaded.webContentLink || "";
};
