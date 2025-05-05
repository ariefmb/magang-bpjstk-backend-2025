import { Request, Response } from "express";
import { otpGenerator } from "src/utils/otpGenerator";
import { sendOTPValidation } from "src/validations/otp.validation";
import { v4 as uuidv4 } from "uuid";
import { findUserByEmail } from "../services/auth.service";
import { createOTPRepo } from "../services/otp.service";
import logger from "../utils/logger";

export const sendOTPController = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const checkUser = await findUserByEmail(email);

        if (checkUser) {
            logger.info("Email already registered");
            res.status(401).send({
                status: false,
                statusCode: 401,
                message: "Email already registered",
            });
        } else {
            req.body.otp_id = uuidv4();
            const otp = await otpGenerator();
            const otpPayload = { ...req.body, otp };

            const { error, value } = await sendOTPValidation(otpPayload);

            if (error) {
                logger.error(`ERR: OTP - send = ${error.details[0].message}`);
                res.status(422).send({
                    status: false,
                    statusCode: 422,
                    message: error.details[0].message,
                });
            } else {
                try {
                    await createOTPRepo(value);
                    logger.info("OTP sent successfully");
                    res.status(200).send({
                        status: true,
                        statusCode: 200,
                        message: "OTP sent successfully",
                        otp: value.otp,
                    });
                } catch (error) {
                    logger.error(`ERR: OTP - send = ${error}`);
                    res.status(422).send({
                        status: false,
                        statusCode: 422,
                        message: error,
                    });
                }
            }
        }
    } catch (error: any) {
        logger.error(error.message);
        res.status(500).send({
            status: false,
            statusCode: 500,
            message: error.message,
        });
    }
};
