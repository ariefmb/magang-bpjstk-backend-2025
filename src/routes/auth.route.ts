import { Router } from "express";
import {
    createSessionController,
    registerUserController,
} from "../controllers/auth.controller";

export const AuthRouter: Router = Router();

AuthRouter.post("/register", registerUserController);
AuthRouter.post("/login", createSessionController);
