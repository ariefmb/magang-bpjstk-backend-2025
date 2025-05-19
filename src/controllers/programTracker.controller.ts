import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import {
    createProgramRepo,
    deleteProgramTrackerRepo,
    getAllProgramTrackersRepo,
    getProgramTrackerByIdRepo,
    updateProgramRepo,
} from "../services/programTracker.service";
import { getVacancyByIdRepo } from "../services/vacancy.service";
import logger from "../utils/logger";
import {
    createProgramTrackerValidation,
    updateProgramTrackerValidation,
} from "../validations/programTracker.validation";

export const createProgramTrackerController = async (req: Request, res: Response): Promise<void> => {
    req.body.programTracker_id = uuidv4();
    const { error, value } = createProgramTrackerValidation(req.body);

    if (error) {
        logger.info(`ERR: program - create = ${error.details[0].message}`);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error.details[0].message,
        });
        return;
    }

    try {
        const vacancy = await getVacancyByIdRepo(value.vacancy_id);

        if (!vacancy) {
            logger.info(`ERR: program - create = Vacancy does not exist`);
            res.status(422).send({
                status: false,
                statusCode: 422,
                message: "Vacancy does not exist",
            });
            return;
        }

        const endDate = new Date(value.end_date);
        endDate.setHours(23, 59, 59, 999);
        value.end_date = endDate;

        await createProgramRepo(value);
        logger.info("Success create program journey");
        res.status(201).send({
            status: true,
            statusCode: 201,
            message: "Success create program journey",
            data: value,
        });
    } catch (error) {
        logger.info(`ERR: program - create = ${error}`);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error,
        });
    }
};

export const getAllProgramTrackersController = async (req: Request, res: Response): Promise<void> => {
    try {
        const programTrackers = await getAllProgramTrackersRepo();
        if (!programTrackers) {
            logger.info("Internal server error");
            res.status(500).send({
                status: false,
                statusCode: 500,
                message: "Internal server error",
                data: [],
            });
            return;
        }
        logger.info("Success get all program trackers data");
        res.status(200).send({
            status: true,
            statusCode: 200,
            message: "Success get all program trackers data",
            data: programTrackers,
        });
    } catch (error) {
        logger.info(`ERR: program trackers - get all = ${error}`);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error,
        });
    }
};

export const getProgramTrackerByIdController = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            params: { programTracker_id },
        } = req;
        
        const programTracker = await getProgramTrackerByIdRepo(programTracker_id);
        if (!programTracker) {
            logger.info("Program tracker data not found!");
            res.status(404).send({
                status: false,
                statusCode: 404,
                message: "Program tracker data not found!",
                data: {},
            });
            return;
        }
        logger.info("Success get program tracker data");
        res.status(200).send({
            status: true,
            statusCode: 200,
            message: "Success get program tracker data",
            data: programTracker,
        });
    } catch (error) {
        logger.info(`ERR: program - get by id = ${error}`);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error,
        });
    }
};

export const updateProgramTrackerController = async (req: Request, res: Response): Promise<void> => {
    const {
        params: { programTracker_id },
    } = req;
    const { error, value } = updateProgramTrackerValidation(req.body, req.body.journey);

    if (error) {
        logger.info(`ERR: program - update = ${error.details[0].message}`);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error.details[0].message,
        });
        return;
    }

    try {
        value.end_date && value.end_date.setHours(23, 59, 59, 999);
        value.journey && value.journey === "Offering" && value.onBoarding_date.setHours(8, 59, 59, 999);

        const updatedData = await updateProgramRepo(programTracker_id, value);

        if (!updatedData) {
            logger.info("Program data not found!");
            res.status(404).send({
                status: false,
                statusCode: 404,
                message: "Program data not found!",
            });
            return;
        }

        logger.info("Success update program journey");
        res.status(200).send({
            status: true,
            statusCode: 200,
            message: "Success update program journey",
        });
    } catch (error) {
        logger.info(`ERR: program - update = ${error}`);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error,
        });
    }
};

export const deleteProgramTrackerController = async (req: Request, res: Response): Promise<void> => {
    const {
        params: { programTracker_id },
    } = req;

    try {
        const deletedData = await deleteProgramTrackerRepo(programTracker_id);
        if (!deletedData) {
            logger.info("Program tracker data not found!");
            res.status(404).send({
                status: false,
                statusCode: 404,
                message: "Program tracker data not found!",
            });
            return;
        }
        logger.info("Success delete program tracker data");
        res.status(200).send({
            status: true,
            statusCode: 200,
            message: "Success delete program tracker data",
        });
    } catch (error) {
        logger.error(`ERR: program tracker - delete = ${error}`);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error,
        });
    }
};
