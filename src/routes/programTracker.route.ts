import { Router } from "express";
import {
    createAdministrationInterviewController,
    deleteProgramTrackerController,
    getAllProgramTrackersController,
    updateAdministrationController,
    updateOfferingController,
} from "../controllers/programTracker.controller";
import { authorization } from "../middleware/authorization";

export const ProgramTrackerRouter: Router = Router();

ProgramTrackerRouter.get("/", authorization(["admin"]), getAllProgramTrackersController);
ProgramTrackerRouter.delete("/:programTracker_id", authorization(["admin"]), deleteProgramTrackerController);

ProgramTrackerRouter.post(
    "/administration_interview",
    authorization(["admin"]),
    createAdministrationInterviewController
);
ProgramTrackerRouter.put(
    "/administration_interview/:programTracker_id",
    authorization(["admin"]),
    updateAdministrationController
);

ProgramTrackerRouter.put("/offering/:programTracker_id", authorization(["admin"]), updateOfferingController);
