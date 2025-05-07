import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import {
    createUserRepo,
    deleteUserByIdRepo,
    findUserByEmail,
    findUserById,
    findUserRepo,
    resetPasswordRepo,
    updateUserByIdRepo,
} from "../services/auth.service";
import {
    sendEmailForgotPasswordService,
    sendEmailVerificationService,
} from "../services/mailSender.service";
import { findMatchOTP } from "../services/otp.service";
import { hashing, verifyHashedData } from "../utils/hashing";
import { signJWT, verifyJWT } from "../utils/jwt";
import logger from "../utils/logger";
import {
    createSessionValidation,
    createUserValidation,
    refreshSessionValidation,
    requestForgotPasswordValidation,
    resetPasswordValidation,
    updateUserValidation,
} from "../validations/auth.validation";
import { deleteOTPController } from "./otp.controller";

export const registerUserController = async (req: Request, res: Response) => {
    req.body.user_id = uuidv4();
    const { error, value } = createUserValidation(req.body);

    if (error) {
        logger.error(`ERR: auth - register = ${error.details[0].message}`);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error.details[0].message,
        });
    } else {
        try {
            value.password = hashing(value.password);
            await createUserRepo(value);
            await sendEmailVerificationService(value.email);

            logger.info(
                "Success register new user and send verification email"
            );
            res.status(201).send({
                status: true,
                statusCode: 201,
                message:
                    "Success register new user and send verification email",
            });
        } catch (error) {
            logger.error(`ERR: auth - create = ${error}`);
            res.status(422).send({
                status: false,
                statusCode: 422,
                message: error,
            });
        }
    }
};

export const createSessionController = async (req: Request, res: Response) => {
    const { error, value } = createSessionValidation(req.body);

    if (error) {
        logger.error(
            `ERR: auth - create session = ${error.details[0].message}`
        );
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error.details[0].message,
        });
    } else {
        try {
            const user = await findUserByEmail(value.email);

            if (user) {
                if (!user.verified) {
                    logger.info("User not verified yet, check your inbox!");
                    res.status(401).send({
                        status: false,
                        statusCode: 401,
                        message: "User not verified yet, check your inbox!",
                    });
                } else {
                    const isValid = verifyHashedData(
                        value.password,
                        user.password
                    );

                    if (!isValid) {
                        logger.info("Invalid email or password");
                        res.status(401).send({
                            status: false,
                            statusCode: 401,
                            message: "Invalid email or password",
                        });
                    } else {
                        const accessToken = signJWT(
                            { ...user },
                            { expiresIn: "1d" }
                        );

                        const refreshToken = signJWT(
                            { ...user },
                            { expiresIn: "1y" }
                        );

                        logger.info("Login success");
                        res.status(200).send({
                            status: true,
                            statusCode: 200,
                            message: "Login success",
                            data: {
                                user,
                                accessToken,
                                refreshToken,
                            },
                        });
                    }
                }
            } else {
                logger.info("User not registered!");
                res.status(404).send({
                    status: false,
                    statusCode: 404,
                    message: "User not registered!",
                });
            }
        } catch (error) {
            logger.error(`ERR: auth - create session = ${error}`);
            res.status(422).send({
                status: false,
                statusCode: 422,
                message: error,
            });
        }
    }
};

export const refreshSessionController = async (req: Request, res: Response) => {
    const { error, value } = refreshSessionValidation(req.body);

    if (error) {
        logger.error(
            `ERR: auth - refresh session = ${error.details[0].message}`
        );
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error.details[0].message,
        });
    } else {
        try {
            const { decoded } = verifyJWT(value.refreshToken);

            const user = await findUserByEmail(decoded._doc.email);
            if (!user) {
                logger.info("User not registered!");
                res.status(404).send({
                    status: false,
                    statusCode: 404,
                    message: "User not registered!",
                });
            } else {
                const accessToken = signJWT({ ...user }, { expiresIn: "1d" });
                logger.info("Refresh token success");
                res.status(200).send({
                    status: true,
                    statusCode: 200,
                    message: "Refresh token success",
                    data: { name: user.name, role: user.role, accessToken },
                });
            }
        } catch (error) {
            logger.error(`ERR: auth - refresh session = ${error}`);
            res.status(422).send({
                status: false,
                statusCode: 422,
                message: error,
            });
        }
    }
};

export const forgotPasswordController = async (req: Request, res: Response) => {
    const { email } = req.body;

    const { error, value } = requestForgotPasswordValidation(email);

    if (error) {
        logger.error(
            `ERR: auth - forgot password = ${error.details[0].message}`
        );
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error.details[0].message,
        });
    } else {
        const user = await findUserByEmail(value.email);

        if (!user) {
            logger.info("User not registered!");
            res.status(404).send({
                status: false,
                statusCode: 404,
                message: "User not registered!",
            });
        } else {
            try {
                await sendEmailForgotPasswordService(user.email);
                logger.info("Success send email to reset password");
                res.status(200).send({
                    status: true,
                    statusCode: 200,
                    message: "Success send email to reset password",
                });
            } catch (error) {
                logger.error(`ERR: auth - forgot password = ${error}`);
                res.status(422).send({
                    status: false,
                    statusCode: 422,
                    message: error,
                });
            }
        }
    }
};

export const resetPasswordController = async (req: Request, res: Response) => {
    const { error, value } = resetPasswordValidation(req.body);

    if (error) {
        logger.error(
            `ERR: auth - reset password = ${error.details[0].message}`
        );
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error.details[0].message,
        });
    } else {
        const matchedOTPRecord = await findMatchOTP(value.email);

        if (!matchedOTPRecord) {
            logger.error(`ERR: auth - reset password = OTP has expired`);
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
                    logger.info(`ERR: auth - reset password = Invalid OTP`);
                    res.status(401).send({
                        status: false,
                        statusCode: 401,
                        message: "Invalid OTP",
                    });
                } else {
                    value.password = hashing(value.password);
                    const resetedPassword = await resetPasswordRepo(
                        value.email,
                        value.password
                    );

                    if (!resetedPassword) {
                        logger.error(
                            `ERR: auth - reset password = Password reset failed`
                        );
                        res.status(422).send({
                            status: false,
                            statusCode: 422,
                            message: "Password reset failed",
                        });
                    } else {
                        await deleteOTPController(value.email);

                        logger.info("Success reset password");
                        res.status(200).send({
                            status: true,
                            statusCode: 200,
                            message: "Success reset password",
                        });
                    }
                }
            } catch (error) {
                logger.error(`ERR: auth - reset password = ${error}`);
                res.status(422).send({
                    status: false,
                    statusCode: 422,
                    message: error,
                });
            }
        }
    }
};

export const getAllUsersController = async (req: Request, res: Response) => {
    const {
        params: { user_id },
    } = req;

    if (user_id) {
        const user = await findUserById(user_id);

        if (user) {
            logger.info("Success find user");
            res.status(200).send({
                status: true,
                statusCode: 200,
                message: "Success find user",
                data: user,
            });
        } else {
            logger.info("User not found!");
            res.status(404).send({
                status: false,
                statusCode: 404,
                message: "User not found!",
                data: {},
            });
        }
    } else {
        const users = await findUserRepo();

        if (users) {
            logger.info("Success get all users");
            res.status(200).send({
                status: true,
                statusCode: 200,
                message: "Success get all users",
                data: users,
            });
        } else {
            logger.info("Internal server error!");
            res.status(500).send({
                status: false,
                statusCode: 500,
                message: "Internal server error",
                data: [],
            });
        }
    }
};

export const updateUserController = async (req: Request, res: Response) => {
    const {
        params: { user_id },
    } = req;
    const { error, value } = updateUserValidation(req.body);

    if (error) {
        logger.error(`ERR: user - update = ${error.details[0].message}`);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error.details[0].message,
        });
    } else {
        try {
            if (value.password) {
                value.password = hashing(value.password);
            }
            const updateUser = await updateUserByIdRepo(user_id, value);

            if (updateUser) {
                logger.info("Success update user data");
                res.status(200).send({
                    status: true,
                    statusCode: 200,
                    message: "Success update user data",
                });
            } else {
                logger.info("User not found!");
                res.status(404).send({
                    status: false,
                    statusCode: 404,
                    message: "User not found!",
                });
            }
        } catch (error) {
            logger.error(`ERR: user - update = ${error}`);
            res.status(422).send({
                status: false,
                statusCode: 422,
                message: error,
            });
        }
    }
};

export const deleteUserController = async (req: Request, res: Response) => {
    const {
        params: { user_id },
    } = req;

    try {
        const deletedUser = await deleteUserByIdRepo(user_id);

        if (deletedUser) {
            logger.info("Success delete user");
            res.status(200).send({
                status: true,
                statusCode: 200,
                message: "Success delete user",
            });
        } else {
            logger.info("User not found!");
            res.status(404).send({
                status: false,
                statusCode: 404,
                message: "User not found!",
            });
        }
    } catch (error) {
        logger.error(`ERR: user - delete = ${error}`);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error,
        });
    }
};
