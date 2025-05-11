import { Router } from "express";
import { addApplicantController } from "../controllers/applicant.controller";
import { authorization } from "../middleware/authorization";
import { uploadApplicantFiles } from "../middleware/uploadFile";

export const ApplicantRouter: Router = Router();

ApplicantRouter.post(
    "/",
    authorization(["mentee"]),
    uploadApplicantFiles.fields([
        { name: "photo", maxCount: 1 },
        { name: "suratPengantar", maxCount: 1 },
        { name: "cv", maxCount: 1 },
        { name: "portfolio", maxCount: 1 },
    ]),
    addApplicantController
);
