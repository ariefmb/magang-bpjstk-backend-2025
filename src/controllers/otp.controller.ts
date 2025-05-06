import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import {
    createOTPRepo,
    deleteOTPRepo,
    findMatchOTP,
} from "../services/otp.service";
import { hashing, verifyHashedData } from "../utils/hashing";
import logger from "../utils/logger";
import { sendVerificationEmail } from "../utils/mailSender";
import { otpGenerator } from "../utils/otpGenerator";
import {
    sendOTPValidation,
    verifyOTPValidation,
} from "../validations/otp.validation";

export const verifyOTPController = async (req: Request, res: Response) => {
    const { error, value } = verifyOTPValidation(req.body);

    if (error) {
        logger.error(`ERR: OTP - verify = ${error.details[0].message}`);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error.details[0].message,
        });
    } else {
        const { email } = req.body;
        const matchedOTPRecord = await findMatchOTP(email);

        if (!matchedOTPRecord) {
            logger.error(`ERR: OTP - verify = OTP has expired`);
            res.status(404).send({
                status: false,
                statusCode: 404,
                message: "OTP has expired",
            });
        } else {
            try {
                const isValid = verifyHashedData(
                    value.otp,
                    matchedOTPRecord.otp
                );

                if (!isValid) {
                    logger.info(`ERR: OTP - verify = Invalid OTP`);
                    res.status(401).send({
                        status: false,
                        statusCode: 401,
                        message: "Invalid OTP",
                    });
                } else {
                    logger.info("Success verify OTP");
                    res.status(200).send({
                        status: true,
                        statusCode: 200,
                        message: "Success verify OTP",
                    });
                    await deleteOTPController(value.email);
                }
            } catch (error) {
                logger.error(`ERR: OTP - verify = ${error}`);
                res.status(422).send({
                    status: false,
                    statusCode: 422,
                    message: error,
                });
            }
        }
    }
};

export const sendOTPController = async (req: Request, res: Response) => {
    const { email } = req.body;
    const checkUser = await findMatchOTP(email);

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

        const { error, value } = sendOTPValidation(otpPayload);

        if (error) {
            logger.error(`ERR: OTP - send = ${error.details[0].message}`);
            res.status(422).send({
                status: false,
                statusCode: 422,
                message: error.details[0].message,
            });
        } else {
            try {
                await sendVerificationEmail(value.email, value.otp);

                value.otp = hashing(value.otp);
                await createOTPRepo(value);

                logger.info("OTP sent successfully");
                res.status(200).send({
                    status: true,
                    statusCode: 200,
                    message: "OTP sent successfully",
                    data: value,
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
};

export const deleteOTPController = async (email: string) => {
    try {
        await deleteOTPRepo(email);
        logger.info("Success delete OTP");
    } catch (error) {
        logger.error(`ERR: OTP - delete = ${error}`);
    }
};
