import { Router } from "express";
import {
    addApplicantController,
    approvedJourneyMentee,
    deleteApplicantController,
    getAllApplicantsController,
    getApplicantByIdController,
    updateApplicantController,
} from "../controllers/applicant.controller";
import { authorization } from "../middleware/authorization";
import { uploadFiles } from "../middleware/uploadFile";

export const ApplicantRouter: Router = Router();

ApplicantRouter.post(
    "/",
    authorization(["mentee"]),
    uploadFiles.fields([
        { name: "photo", maxCount: 1 },
        { name: "suratPengantar", maxCount: 1 },
        { name: "cv", maxCount: 1 },
        { name: "portfolio", maxCount: 1 },
    ]),
    addApplicantController
);
ApplicantRouter.get("/", authorization(["admin", "mentor"]), getAllApplicantsController);
ApplicantRouter.get("/search", authorization(["admin", "mentor"]), getAllApplicantsController);
ApplicantRouter.get("/:applicant_id", authorization(["admin", "mentor"]), getApplicantByIdController);
ApplicantRouter.put(
    "/:applicant_id",
    authorization(["admin", "mentee"]),
    uploadFiles.fields([
        { name: "photo", maxCount: 1 },
        { name: "suratPengantar", maxCount: 1 },
        { name: "cv", maxCount: 1 },
        { name: "portfolio", maxCount: 1 },
        { name: "surat_kuasa", maxCount: 1 },
        { name: "surat_perjanjian", maxCount: 1 },
        { name: "suratPeminjaman_idCard", maxCount: 1 },
    ]),
    updateApplicantController
);
ApplicantRouter.put("/approval/:applicant_id", authorization(["admin", "mentor"]), approvedJourneyMentee);
ApplicantRouter.delete("/:applicant_id", authorization(["admin"]), deleteApplicantController);
