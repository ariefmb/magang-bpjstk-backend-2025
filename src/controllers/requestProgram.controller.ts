import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { searchProgramRepo } from "../services/program.service";
import {
    deleteReqProgramRepo,
    getReqProgramByIdRepo,
    getReqProgramsRepo,
    requestProgramRepo,
    updateReqProgramRepo,
} from "../services/requestProgram.service";
import { calculateQuarter } from "../utils/calculateQuarter";
import logger from "../utils/logger";
import { updateProgramValidation } from "../validations/program.validation";
import { requestProgramValidation } from "../validations/requestProgram.validation";

export const requestingProgramController = async (req: Request, res: Response): Promise<void> => {
    req.body.reqProgram_id = uuidv4();
    const { error, value } = requestProgramValidation(req.body);

    if (error) {
        logger.info(`ERR: request program - create = ${error.details[0].message}`);
        res.status(422).json({
            status: false,
            statusCode: 422,
            message: error.details[0].message,
        });
        return;
    }

    try {
        value.end_date.setHours(23, 59, 59, 999);
        value.tw = calculateQuarter(value.end_date);

        await requestProgramRepo(value);
        logger.info("Success request new program");
        res.status(201).json({
            status: true,
            statusCode: 201,
            message: "Success request new program",
            data: value,
        });
    } catch (error) {
        logger.error(`ERR: request program - create = ${error}`);
        res.status(500).json({
            status: false,
            statusCode: 500,
            message: error,
        });
    }
};

export const getReqProgramsController = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            query: { title },
        } = req;

        const reqPrograms = title ? await searchProgramRepo(title.toString()) : await getReqProgramsRepo();

        if (!reqPrograms) {
            logger.info("Internal server error");
            res.status(500).json({
                status: false,
                statusCode: 500,
                message: "Internal server error",
                data: [],
            });
            return;
        }

        logger.info("Success get all requested programs data");
        res.status(200).json({
            status: true,
            statusCode: 200,
            message: "Success get all requested programs data",
            data: reqPrograms,
        });
    } catch (error) {
        logger.error(`ERR: request programs - get all = ${error}`);
        res.status(500).json({
            status: false,
            statusCode: 500,
            message: error,
        });
    }
};

export const getReqProgramByIdController = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            params: { reqProgram_id },
        } = req;

        const reqProgram = await getReqProgramByIdRepo(reqProgram_id);

        if (!reqProgram) {
            logger.info("Requested program data not found!");
            res.status(404).json({
                status: false,
                statusCode: 404,
                message: "Requested program data not found!",
                data: {},
            });
            return;
        }

        logger.info("Success get requested program data");
        res.status(200).json({
            status: true,
            statusCode: 200,
            message: "Success get requested program data",
            data: reqProgram,
        });
    } catch (error) {
        logger.error(`ERR: request program - get by id = ${error}`);
        res.status(500).json({
            status: false,
            statusCode: 500,
            message: error,
        });
    }
};

export const updateReqProgramController = async (req: Request, res: Response): Promise<void> => {
    const {
        params: { reqProgram_id },
    } = req;
    const { error, value } = updateProgramValidation(req.body);

    if (error) {
        logger.info(`ERR: request program - update = ${error.details[0].message}`);
        res.status(422).json({
            status: false,
            statusCode: 422,
            message: error.details[0].message,
        });
        return;
    }

    try {
        if (value.end_date) value.tw = calculateQuarter(value.endDate);
        const updateData = await updateReqProgramRepo(reqProgram_id, value);

        if (!updateData) {
            logger.info("Request program not found!");
            res.status(404).json({
                status: false,
                statusCode: 404,
                message: "Request program not found!",
            });
            return;
        }

        logger.info("Success update request program data");
        res.status(200).json({
            status: true,
            statusCode: 200,
            message: "Success update request program data",
        });
    } catch (error) {
        logger.error(`ERR: request program - update = ${error}`);
        res.status(500).json({
            status: false,
            statusCode: 500,
            message: error,
        });
    }
};

export const deleteReqProgramController = async (req: Request, res: Response): Promise<void> => {
    const {
        params: { reqProgram_id },
    } = req;

    try {
        const deletedData = await deleteReqProgramRepo(reqProgram_id);

        if (!deletedData) {
            logger.info("Requested program data not found!");
            res.status(404).json({
                status: false,
                statusCode: 404,
                message: "Requested program data not found!",
            });
            return;
        }

        logger.info("Success delete requested program data");
        res.status(200).json({
            status: true,
            statusCode: 200,
            message: "Success delete requested program data",
        });
    } catch (error) {
        logger.error(`ERR: request program - delete = ${error}`);
        res.status(500).json({
            status: false,
            statusCode: 500,
            message: error,
        });
    }
};
