import { Router } from "express";
import {
    createSessionController,
    getAllUsersController,
    refreshSessionController,
    registerUserController,
    updateUserController,
} from "../controllers/auth.controller";
import { requireAdmin } from "../middleware/auth";

export const AuthRouter: Router = Router();

AuthRouter.post("/register", registerUserController);
AuthRouter.post("/login", createSessionController);
AuthRouter.post("/refresh", refreshSessionController);
AuthRouter.get("/", requireAdmin, getAllUsersController);
AuthRouter.get("/:user_id", requireAdmin, getAllUsersController);
AuthRouter.put("/:user_id", updateUserController);
