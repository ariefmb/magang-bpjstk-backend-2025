import { Router } from "express";
import {
    assignZoomController,
    deleteAssignZoomController,
    getAllAssignZoomsController,
    getAssignZoomByIdController,
    updateAssignZoomController,
} from "../../controllers/journey controllers/zoomAssign.controller";
import { authorization } from "../../middleware/authorization";

export const ZoomAssignRouter: Router = Router();

ZoomAssignRouter.post("/", authorization(["admin", "mentor"]), assignZoomController);
ZoomAssignRouter.get("/", authorization(["admin", "mentor"]), getAllAssignZoomsController);
ZoomAssignRouter.get("/:zoomAssign_id", authorization(["admin", "mentor", "mentee"]), getAssignZoomByIdController);
ZoomAssignRouter.put("/:zoomAssign_id", authorization(["admin", "mentor"]), updateAssignZoomController);
ZoomAssignRouter.delete("/:zoomAssign_id", authorization(["admin"]), deleteAssignZoomController);
