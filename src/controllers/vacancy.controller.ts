import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import logger from "../utils/logger";
import { createVacancyValidation } from "../validations/vacancy.validation";
import { createVacancyRepo, getVacanciesRepo, getVacancyByIdRepo } from "../services/vacancy.service";

export const createVacancyController = async (req: Request, res: Response) => {
    req.body.vacancy_id = uuidv4();
    const { error, value } = createVacancyValidation(req.body);

    if (error) {
        logger.info(`ERR: vacancy - create = ${error.details[0].message}`);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error.details[0].message,
        });
    } else {
        try {
            await createVacancyRepo(value)
            logger.info('Success create new vacancy')
            res.status(201).send({
                status: true,
                statusCode: 201,
                message: "Success create new vacancy",
                data: value
            })
        } catch (error) {
            logger.info(`ERR: vacancy - create = ${error}`);
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

