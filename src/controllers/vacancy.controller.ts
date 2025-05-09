import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import {
    createVacancyRepo,
    getAndUpdateStatusVacancy,
    getVacanciesRepo,
    getVacancyByIdRepo,
    updateStatusVacancy,
    updateVacancyByIdRepo,
} from "../services/vacancy.service";
import logger from "../utils/logger";
import {
    createVacancyValidation,
    updateVacancyValidation,
} from "../validations/vacancy.validation";

export const createVacancyController = async (req: Request, res: Response) => {
    req.body.vacancy_id = uuidv4();

    const { error, value } = createVacancyValidation(req.body);

    if (error) {
        logger.info(`tes ERR: vacancy - create = ${error.details[0].message}`);
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

            value.status = getAndUpdateStatusVacancy(
                value.open_vacancy,
                value.close_vacancy
            );

            await createVacancyRepo(value);
            logger.info("Success create new vacancy");
            res.status(201).send({
                status: true,
                statusCode: 201,
                message: "Success create new vacancy",
                data: value,
            });
        } catch (error) {
            logger.info(`ERRR: vacancy - create = ${error}`);
            res.status(422).send({
                status: false,
                statusCode: 422,
                message: error,
            });
        }
    }
};

export const getVacanciesController = async (req: Request, res: Response) => {
    const {
        params: { vacancy_id },
    } = req;

    await updateStatusVacancy(vacancy_id);

    if (vacancy_id) {
        const vacancy = await getVacancyByIdRepo(vacancy_id);

        if (vacancy) {
            logger.info("Success get vacancy data");
            res.status(200).send({
                status: true,
                statusCode: 200,
                message: "Success get vacancy data",
                data: vacancy,
            });
        } else {
            logger.info("Vacancy data not found!");
            res.status(404).send({
                status: false,
                statusCode: 404,
                message: "Vacancy data not found!",
                data: {},
            });
        }
    } else {
        const vacancies: any = await getVacanciesRepo();
        if (vacancies) {
            logger.info("Success get all vacancies data");
            res.status(200).send({
                status: true,
                statusCode: 200,
                message: "Success get all vacancies data",
                data: vacancies,
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
    }
};

export const updateVacancyController = async (req: Request, res: Response) => {
    const {
        params: { vacancy_id },
    } = req;
    const { error, value } = updateVacancyValidation(req.body);

    if (error) {
        logger.info(`ERR: vacancy - update = ${error.details[0].message}`);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error.details[0].message,
        });
    } else {
        try {
            if (req.body.open_vacancy || req.body.close_vacancy) {
                const closingDate = new Date(value.close_vacancy);
                closingDate.setHours(23, 59, 59, 999);
                value.close_vacancy = closingDate;
    
                value.status = getAndUpdateStatusVacancy(
                    value.open_vacancy,
                    value.close_vacancy
                );
            }

            const updateData = await updateVacancyByIdRepo(vacancy_id, value);

            if (updateData) {
                logger.info("Success update vacancy data");
                res.status(200).send({
                    status: true,
                    statusCode: 200,
                    message: "Success update vacancy data",
                });
            } else {
                logger.info("Vacancy not found!");
                res.status(404).send({
                    status: false,
                    statusCode: 404,
                    message: "Vacancy not found!",
                });
            }
        } catch (error) {
            logger.error(`ERR: vacancy - update = ${error}`);
            res.status(422).send({
                status: false,
                statusCode: 422,
                message: error,
            });
        }
    }
};
