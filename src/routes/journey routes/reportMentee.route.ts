import { Router } from "express";
import {
    createReportMenteeController,
    deleteReportMenteeController,
    getAllReportMenteesController,
    getReportMenteeByIdController,
    updateReportMenteeController,
} from "../../controllers/journey controllers/reportMentee.controller";
import { authorization } from "../../middleware/authorization";

export const ReportMenteeRouter: Router = Router();

ReportMenteeRouter.post("/", authorization(["admin", "mentor", "mentee"]), createReportMenteeController);
ReportMenteeRouter.get("/", authorization(["admin", "mentor"]), getAllReportMenteesController);
ReportMenteeRouter.get(
    "/:reportMentee_id",
    authorization(["admin", "mentor", "mentee"]),
    getReportMenteeByIdController
);
ReportMenteeRouter.put("/:reportMentee_id", authorization(["admin", "mentor", "mentee"]), updateReportMenteeController);
ReportMenteeRouter.delete("/:reportMentee_id", authorization(["admin"]), deleteReportMenteeController);
