import { Router } from "express";
import {
    addCertificateMenteeController,
    deleteCertificateMenteeController,
    getAllCertificateMenteesController,
    getCertificateMenteeByIdController,
    updateCertificateMenteeController,
} from "../../controllers/journey controllers/certificateMentee.controller";
import { authorization } from "../../middleware/authorization";
import { uploadFiles } from "../../middleware/uploadFile";

export const CertificateMenteeRouter: Router = Router();

CertificateMenteeRouter.post(
    "/",
    authorization(["admin", "mentor"]),
    uploadFiles.fields([{ name: "certificate", maxCount: 1 }]),
    addCertificateMenteeController
);
CertificateMenteeRouter.get("/", authorization(["admin"]), getAllCertificateMenteesController);
CertificateMenteeRouter.get(
    "/:certificateMentee_id",
    authorization(["admin", "mentor", "mentee"]),
    getCertificateMenteeByIdController
);
CertificateMenteeRouter.put(
    "/:certificateMentee_id",
    authorization(["admin"]),
    uploadFiles.fields([{ name: "certificate", maxCount: 1 }]),
    updateCertificateMenteeController
);
CertificateMenteeRouter.delete("/:certificateMentee_id", authorization(["admin"]), deleteCertificateMenteeController);
