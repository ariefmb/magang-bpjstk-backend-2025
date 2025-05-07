import { Router } from "express";
import {
    createSessionController,
    deleteUserController,
    forgotPasswordController,
    getAllUsersController,
    refreshSessionController,
    registerUserController,
    resetPasswordController,
    updateUserController,
} from "../controllers/auth.controller";
import { requireAdmin } from "../middleware/auth";

export const AuthRouter: Router = Router();

AuthRouter.post("/register", registerUserController);
AuthRouter.post("/login", createSessionController);
AuthRouter.post("/refresh", refreshSessionController);
AuthRouter.post("/forgot_password", forgotPasswordController);
AuthRouter.post("/forgot_password/reset", resetPasswordController);
AuthRouter.get("/", requireAdmin, getAllUsersController);
AuthRouter.get("/:user_id", requireAdmin, getAllUsersController);
AuthRouter.put("/:user_id", requireAdmin, updateUserController);
AuthRouter.delete("/:user_id", requireAdmin, deleteUserController);
