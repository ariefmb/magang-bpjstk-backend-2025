import { Router } from "express";
import {
    createProgramTrackerController,
    deleteProgramTrackerController,
    getAllProgramTrackersController,
    updateProgramTrackerController,
} from "../controllers/programTracker.controller";
import { authorization } from "../middleware/authorization";

export const ProgramTrackerRouter: Router = Router();

ProgramTrackerRouter.post("/", authorization(["admin"]), createProgramTrackerController);
ProgramTrackerRouter.get("/", authorization(["admin"]), getAllProgramTrackersController);
ProgramTrackerRouter.put("/:programTracker_id", authorization(["admin"]), updateProgramTrackerController);
ProgramTrackerRouter.delete("/:programTracker_id", authorization(["admin"]), deleteProgramTrackerController);
