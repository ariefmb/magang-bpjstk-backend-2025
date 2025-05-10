import { Router } from "express";
import {
    deleteReqVacancyController,
    getReqVacanciesController,
    getReqVacancyByIdController,
    requestingVacancyController,
    updateReqVacancyController,
} from "../controllers/requestVacancy.controller";
import { requireAdminMentor, requireMentor } from "../middleware/auth";

export const ReqVacancyRoute: Router = Router();

ReqVacancyRoute.post("/", requireMentor, requestingVacancyController);
ReqVacancyRoute.get("/", requireAdminMentor, getReqVacanciesController);
ReqVacancyRoute.get("/search", requireAdminMentor, getReqVacanciesController);
ReqVacancyRoute.get(
    "/:reqVacancy_id",
    requireAdminMentor,
    getReqVacancyByIdController
);
ReqVacancyRoute.put(
    "/:reqVacancy_id",
    requireMentor,
    updateReqVacancyController
);
ReqVacancyRoute.delete(
    "/:reqVacancy_id",
    requireAdminMentor,
    deleteReqVacancyController
);
