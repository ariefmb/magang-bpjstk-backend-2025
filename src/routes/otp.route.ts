import { Router } from "express";
import { sendOTPController, verifyOTPController } from "../controllers/otp.controller";

export const OTPRouter: Router = Router()

OTPRouter.post("/", sendOTPController)
OTPRouter.post("/verify", verifyOTPController)