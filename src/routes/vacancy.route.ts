import { Router } from "express";
import { createVacancyController, getVacanciesController } from "../controllers/vacancy.controller";
import { requireAdmin } from "../middleware/auth";

export const VacancyRouter: Router = Router();

VacancyRouter.post("/", requireAdmin, createVacancyController);
VacancyRouter.get("/", getVacanciesController);
VacancyRouter.get("/:vacancy_id", getVacanciesController);