import { Router } from "express";
import {
    createSessionController,
    refreshSessionController,
    registerUserController,
} from "../controllers/auth.controller";

export const AuthRouter: Router = Router();

AuthRouter.post("/register", registerUserController);
AuthRouter.post("/login", createSessionController);
AuthRouter.post('/refresh', refreshSessionController)