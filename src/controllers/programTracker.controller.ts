import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import {
    createAdministration,
    deleteProgramTrackerRepo,
    getAllProgramTrackersRepo,
    updateAdministration,
} from "../services/programTracker.service";
import { getVacancyByIdRepo } from "../services/vacancy.service";
import logger from "../utils/logger";
import {
    createAdministrationValidation,
    updateAdministrationValidation,
} from "../validations/administration.validation";

export const createAdministrationController = async (req: Request, res: Response) => {
    req.body.programTracker_id = uuidv4();
    const { error, value } = createAdministrationValidation(req.body);

    if (error) {
        logger.info(`ERR: administration - create = ${error.details[0].message}`);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error.details[0].message,
        });
    } else {
        try {
            const vacancy = await getVacancyByIdRepo(value.vacancy_id);

            if (!vacancy) {
                logger.info(`ERR: applicant - create = Vacancy does not exist`);
                res.status(422).send({
                    status: false,
                    statusCode: 422,
                    message: "Vacancy does not exist",
                });
            } else {
                const endDate = new Date(value.end_date);
                endDate.setHours(23, 59, 59, 999);
                value.end_date = endDate;

                await createAdministration(value);
                logger.info("Success create administration");
                res.status(201).send({
                    status: true,
                    statusCode: 201,
                    message: "Success create administration",
                    data: value,
                });
            }
        } catch (error) {
            logger.info(`ERR: administration - create = ${error}`);
            res.status(422).send({
                status: false,
                statusCode: 422,
                message: error,
            });
        }
    }
};

export const getAllProgramTrackersController = async (req: Request, res: Response) => {
    try {
        const programTrackers = await getAllProgramTrackersRepo();
        if (programTrackers) {
            logger.info("Success get all program trackers data");
            res.status(200).send({
                status: true,
                statusCode: 200,
                message: "Success get all program trackers data",
                data: programTrackers,
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
        logger.info(`ERR: program trackers - get all = ${error}`);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error,
        });
    }
};

export const updateAdministrationController = async (req: Request, res: Response) => {
    const {
        params: { programTracker_id },
    } = req;
    const { error, value } = updateAdministrationValidation(req.body);

    if (error) {
        logger.info(`ERR: administration - update = ${error.details[0].message}`);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error.details[0].message,
        });
    } else {
        try {
            if (req.body.end_date) {
                const endDate = new Date(value.end_date);
                endDate.setHours(23, 59, 59, 999);
                value.end_date = endDate;
            }

            const updatedData = await updateAdministration(programTracker_id, value);

            if (updatedData) {
                logger.info("Success update administration");
                res.status(200).send({
                    status: true,
                    statusCode: 200,
                    message: "Success update administration",
                });
            } else {
                logger.info("Administration data not found!");
                res.status(404).send({
                    status: false,
                    statusCode: 404,
                    message: "Administration data not found!",
                });
            }
        } catch (error) {
            logger.info(`ERR: administration - update = ${error}`);
            res.status(422).send({
                status: false,
                statusCode: 422,
                message: error,
            });
        }
    }
};

export const deleteProgramTrackerController = async (req: Request, res: Response) => {
    const {
        params: { programTracker_id },
    } = req;

    try {
        const deletedData = await deleteProgramTrackerRepo(programTracker_id);
        if (deletedData) {
            logger.info("Success delete program tracker data");
            res.status(200).send({
                status: true,
                statusCode: 200,
                message: "Success delete program tracker data",
            });
        } else {
            logger.info("Program tracker data not found!");
            res.status(404).send({
                status: false,
                statusCode: 404,
                message: "Program tracker data not found!",
            });
        }
    } catch (error) {
        logger.error(`ERR: program tracker - delete = ${error}`);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error,
        });
    }
};
