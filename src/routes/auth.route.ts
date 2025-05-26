import { Router } from "express";
import {
    deleteUserController,
    forgotPasswordController,
    getAllMentorsController,
    getAllUsersController,
    getMentorByIdController,
    getUserByIdController,
    loginController,
    logoutController,
    refreshSessionController,
    registerUserController,
    resetPasswordController,
    updateUserController,
} from "../controllers/auth.controller";
import { authorization } from "../middleware/authorization";

export const AuthRouter: Router = Router();

AuthRouter.post("/register", registerUserController);
AuthRouter.post("/login", loginController);
AuthRouter.post("/refresh", refreshSessionController);
AuthRouter.post("/logout", logoutController);
AuthRouter.post("/forgot_password", forgotPasswordController);
AuthRouter.post("/forgot_password/reset", resetPasswordController);
AuthRouter.get("/all", authorization(["admin"]), getAllUsersController);
AuthRouter.get("/all/search", authorization(["admin"]), getAllUsersController);
AuthRouter.get("/all/:user_id", authorization(["admin"]), getUserByIdController);
AuthRouter.get("/mentor", authorization(["admin"]), getAllMentorsController);
AuthRouter.get("/mentor/search", authorization(["admin"]), getAllMentorsController);
AuthRouter.get("/mentor/:user_id", authorization(["admin"]), getMentorByIdController);
AuthRouter.put("/:user_id", authorization(["admin"]), updateUserController);
AuthRouter.delete("/:user_id", authorization(["admin"]), deleteUserController);
