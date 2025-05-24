import { Router } from "express";
import {
    deleteReqProgramController,
    getReqProgramByIdController,
    getReqProgramsController,
    requestingProgramController,
    updateReqProgramController,
} from "../controllers/requestProgram.controller";
import { authorization } from "../middleware/authorization";

export const ReqProgramRoute: Router = Router();

ReqProgramRoute.post("/", authorization(["mentor"]), requestingProgramController);
ReqProgramRoute.get("/", authorization(["admin", "mentor"]), getReqProgramsController);
ReqProgramRoute.get("/search", authorization(["admin", "mentor"]), getReqProgramsController);
ReqProgramRoute.get("/:reqProgram_id", authorization(["admin", "mentor"]), getReqProgramByIdController);
ReqProgramRoute.put("/:reqProgram_id", authorization(["mentor"]), updateReqProgramController);
ReqProgramRoute.delete("/:reqProgram_id", authorization(["admin", "mentor"]), deleteReqProgramController);
