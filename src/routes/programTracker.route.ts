import { Router } from "express";
import {
    createAdministrationController,
    deleteProgramTrackerController,
    getAllProgramTrackersController,
    updateAdministrationController,
} from "../controllers/programTracker.controller";
import { authorization } from "../middleware/authorization";

export const ProgramTrackerRouter: Router = Router();

ProgramTrackerRouter.post("/administration", authorization(["admin"]), createAdministrationController);
ProgramTrackerRouter.get("/", authorization(["admin"]), getAllProgramTrackersController);
ProgramTrackerRouter.put(
    "/administration/:programTracker_id",
    authorization(["admin"]),
    updateAdministrationController
);
ProgramTrackerRouter.delete("/:programTracker_id", authorization(["admin"]), deleteProgramTrackerController);
