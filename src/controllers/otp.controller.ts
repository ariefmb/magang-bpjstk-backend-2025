import { Request, Response } from "express";
import { updateUserByEmailRepo } from "../services/auth.service";
import { deleteOTPRepo, findMatchOTP } from "../services/otp.service";
import { verifyHashedData } from "../utils/hashing";
import logger from "../utils/logger";
import { verifyOTPValidation } from "../validations/otp.validation";
import { sendEmailVerificationService } from "../services/mailSender.service";

export const sendOTPController = async (req: Request, res: Response) => {
    try {
        const { email, createdAt } = req.body;
        const result = await sendEmailVerificationService(email, createdAt);

        logger.info("OTP sent successfully");
        res.status(200).send({
            status: true,
            statusCode: 200,
            message: "OTP sent successfully",
            data: result,
        });
    } catch (error) {
        logger.error(`ERR: OTP - send = ${error}`);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error,
        });
    }
};

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
                    const updateVerified = await updateUserByEmailRepo(
                        value.email
                    );

                    if (!updateVerified) {
                        logger.error(`ERR: OTP - verify = User not found`);
                        res.status(404).send({
                            status: false,
                            statusCode: 404,
                            message: "User not found",
                        });
                    } else {
                        await deleteOTPController(value.email);
                        
                        logger.info("Success verify OTP");
                        res.status(200).send({
                            status: true,
                            statusCode: 200,
                            message: "Success verify OTP",
                        });
                    }
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

export const deleteOTPController = async (email: string) => {
    try {
        await deleteOTPRepo(email);
        logger.info("Success delete OTP");
    } catch (error) {
        logger.error(`ERR: OTP - delete = ${error}`);
    }
};
