import { Router } from "express";
import {
    createVacancyController,
    deleteVacancyController,
    getVacanciesController,
    updateVacancyController,
} from "../controllers/vacancy.controller";
import { requireAdmin } from "../middleware/auth";

export const VacancyRouter: Router = Router();

VacancyRouter.post("/", requireAdmin, createVacancyController);
VacancyRouter.get("/", getVacanciesController);
VacancyRouter.get("/:vacancy_id", getVacanciesController);
VacancyRouter.put("/:vacancy_id", requireAdmin, updateVacancyController);
VacancyRouter.delete("/:vacancy_id", requireAdmin, deleteVacancyController);
