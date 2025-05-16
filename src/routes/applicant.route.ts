import { Router } from "express";
import {
    addApplicantController,
    deleteApplicantController,
    getAllApplicantsController,
    getApplicantByIdController,
    updateApplicantController,
} from "../controllers/applicant.controller";
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
ApplicantRouter.get(
    "/",
    authorization(["admin", "mentor"]),
    getAllApplicantsController
);
ApplicantRouter.get(
    "/search",
    authorization(["admin", "mentor"]),
    getAllApplicantsController
);
ApplicantRouter.get(
    "/:applicant_id",
    authorization(["admin", "mentor"]),
    getApplicantByIdController
);
ApplicantRouter.put(
    "/:applicant_id",
    authorization(["admin", "mentee"]),
    uploadApplicantFiles.fields([
        { name: "photo", maxCount: 1 },
        { name: "suratPengantar", maxCount: 1 },
        { name: "cv", maxCount: 1 },
        { name: "portfolio", maxCount: 1 },
    ]),
    updateApplicantController
);
ApplicantRouter.delete(
    "/:applicant_id",
    authorization(["admin"]),
    deleteApplicantController
);
