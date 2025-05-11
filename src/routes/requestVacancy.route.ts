import { Router } from "express";
import {
    deleteReqVacancyController,
    getReqVacanciesController,
    getReqVacancyByIdController,
    requestingVacancyController,
    updateReqVacancyController,
} from "../controllers/requestVacancy.controller";
import { authorization } from "../middleware/authorization";

export const ReqVacancyRoute: Router = Router();

ReqVacancyRoute.post(
    "/",
    authorization(["mentor"]),
    requestingVacancyController
);
ReqVacancyRoute.get(
    "/",
    authorization(["admin", "mentor"]),
    getReqVacanciesController
);
ReqVacancyRoute.get(
    "/search",
    authorization(["admin", "mentor"]),
    getReqVacanciesController
);
ReqVacancyRoute.get(
    "/:reqVacancy_id",
    authorization(["admin", "mentor"]),
    getReqVacancyByIdController
);
ReqVacancyRoute.put(
    "/:reqVacancy_id",
    authorization(["mentor"]),
    updateReqVacancyController
);
ReqVacancyRoute.delete(
    "/:reqVacancy_id",
    authorization(["admin", "mentor"]),
    deleteReqVacancyController
);
