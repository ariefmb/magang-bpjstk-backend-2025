// import { Router } from "express";
// import {
//     approvalReqVacancyController,
//     createVacancyController,
//     deleteVacancyController,
//     getVacanciesController,
//     getVacancyByIdController,
//     updateVacancyController,
// } from "../controllers/vacancy.controller";
// import { authorization } from "../middleware/authorization";

// export const VacancyRouter: Router = Router();

// VacancyRouter.post("/", authorization(["admin"]), createVacancyController);
// VacancyRouter.get("/", getVacanciesController);
// VacancyRouter.get("/search", getVacanciesController);
// VacancyRouter.get("/:vacancy_id", getVacancyByIdController);
// VacancyRouter.put(
//     "/:vacancy_id",
//     authorization(["admin"]),
//     updateVacancyController
// );
// VacancyRouter.delete(
//     "/:vacancy_id",
//     authorization(["admin"]),
//     deleteVacancyController
// );
// VacancyRouter.put(
//     "/approval/:reqVacancy_id",
//     authorization(["admin"]),
//     approvalReqVacancyController
// );
