import { Router } from "express";
import { sendOTPController } from "../controllers/otp.controller";

export const OTPRouter: Router = Router()

OTPRouter.post("/", sendOTPController)