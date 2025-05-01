import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { createUserRepo, findUserByEmail } from "../services/auth.service";
import { checkPassword, hashing } from "../utils/hashing";
import { signJWT, verifyJWT } from "../utils/jwt";
import logger from "../utils/logger";
import {
    createSessionValidation,
    createUserValidation,
    refreshSessionValidation,
} from "../validations/auth.validation";

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
            logger.info("Success register new user");
            res.status(201).send({
                status: true,
                statusCode: 201,
                message: "Success register new user",
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
                const isValid = checkPassword(value.password, user.password);

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
                            name: user.name,
                            role: user.role,
                            accessToken,
                            refreshToken,
                        },
                    });
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
