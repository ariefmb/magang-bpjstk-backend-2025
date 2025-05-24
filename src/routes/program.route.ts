import { Router } from "express";
import {
    approvalReqProgramController,
    createProgramController,
    deleteProgramController,
    getAllProgramsController,
    getProgramByIdController,
    updateProgramController,
} from "../controllers/program.controller";
import { authorization } from "../middleware/authorization";

export const ProgramRouter: Router = Router();

ProgramRouter.post("/", authorization(["admin"]), createProgramController);
ProgramRouter.get("/", getAllProgramsController);
ProgramRouter.get("/search", getAllProgramsController);
ProgramRouter.get("/:program_id", getProgramByIdController);
ProgramRouter.put("/:program_id", authorization(["admin"]), updateProgramController);
ProgramRouter.delete("/:program_id", authorization(["admin"]), deleteProgramController);
ProgramRouter.put("/approval/:reqVacancy_id", authorization(["admin"]), approvalReqProgramController);
