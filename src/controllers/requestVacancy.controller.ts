import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import {
    deleteReqVacancyRepo,
    getReqVacanciesRepo,
    getReqVacancyByIdRepo,
    requestVacancyRepo,
    searchReqVacancyRepo,
    updateReqVacancyRepo,
} from "../services/requestVacancy.service";
import logger from "../utils/logger";
import {
    requestVacancyValidation,
    updateRequestVacancyValidation,
} from "../validations/requestVacancy.validation";

export const requestingVacancyController = async (
    req: Request,
    res: Response
) => {
    req.body.reqVacancy_id = uuidv4();
    const { error, value } = requestVacancyValidation(req.body);

    if (error) {
        logger.info(
            `ERR: request vacancy - create = ${error.details[0].message}`
        );
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error.details[0].message,
        });
    } else {
        try {
            const closingDate = new Date(value.close_vacancy);
            closingDate.setHours(23, 59, 59, 999);
            value.close_vacancy = closingDate;

            await requestVacancyRepo(value);
            logger.info("Success request new vacancy");
            res.status(201).send({
                status: true,
                statusCode: 201,
                message: "Success request new vacancy",
                data: value,
            });
        } catch (error) {
            logger.info(`ERR: request vacancy - create = ${error}`);
            res.status(422).send({
                status: false,
                statusCode: 422,
                message: error,
            });
        }
    }
};

export const getReqVacanciesController = async (
    req: Request,
    res: Response
) => {
    try {
        const {
            query: { title },
        } = req;

        const reqVacancies = title
            ? await searchReqVacancyRepo(title.toString())
            : await getReqVacanciesRepo();

        if (reqVacancies) {
            logger.info("Success get all requested vacancies data");
            res.status(200).send({
                status: true,
                statusCode: 200,
                message: "Success get all requested vacancies data",
                data: reqVacancies,
            });
        } else {
            logger.info("Internal server error");
            res.status(500).send({
                status: false,
                statusCode: 500,
                message: "Internal server error",
                data: [],
            });
        }
    } catch (error) {
        logger.info(`ERR: request vacancies - get all = ${error}`);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error,
        });
    }
};

export const getReqVacancyByIdController = async (
    req: Request,
    res: Response
) => {
    try {
        const {
            params: { reqVacancy_id },
        } = req;

        const reqVacancy = await getReqVacancyByIdRepo(reqVacancy_id);

        if (reqVacancy) {
            logger.info("Success get requested vacancy data");
            res.status(200).send({
                status: true,
                statusCode: 200,
                message: "Success get requested vacancy data",
                data: reqVacancy,
            });
        } else {
            logger.info("Requested vacancy data not found!");
            res.status(404).send({
                status: false,
                statusCode: 404,
                message: "Requested vacancy data not found!",
                data: {},
            });
        }
    } catch (error) {
        logger.info(`ERR: request vacancy - get by id = ${error}`);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error,
        });
    }
};

export const updateReqVacancyController = async (
    req: Request,
    res: Response
) => {
    const {
        params: { reqVacancy_id },
    } = req;
    const { error, value } = updateRequestVacancyValidation(req.body);

    if (error) {
        logger.info(
            `ERR: request vacancy - update = ${error.details[0].message}`
        );
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error.details[0].message,
        });
    } else {
        try {
            const updateData = await updateReqVacancyRepo(reqVacancy_id, value);

            if (updateData) {
                logger.info("Success update request vacancy data");
                res.status(200).send({
                    status: true,
                    statusCode: 200,
                    message: "Success update request vacancy data",
                });
            } else {
                logger.info("Request vacancy not found!");
                res.status(404).send({
                    status: false,
                    statusCode: 404,
                    message: "Request vacancy not found!",
                });
            }
        } catch (error) {
            logger.error(`ERR: request vacancy - update = ${error}`);
            res.status(422).send({
                status: false,
                statusCode: 422,
                message: error,
            });
        }
    }
};

export const deleteReqVacancyController = async (
    req: Request,
    res: Response
) => {
    const {
        params: { reqVacancy_id },
    } = req;

    try {
        const deletedData = await deleteReqVacancyRepo(reqVacancy_id);

        if (deletedData) {
            logger.info("Success delete requested vacancy data");
            res.status(200).send({
                status: true,
                statusCode: 200,
                message: "Success delete requested vacancy data",
            });
        } else {
            logger.info("Requested vacancy data not found!");
            res.status(404).send({
                status: false,
                statusCode: 404,
                message: "Requested vacancy data not found!",
            });
        }
    } catch (error) {
        logger.error(`ERR: request vacancy - delete = ${error}`);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error,
        });
    }
};
