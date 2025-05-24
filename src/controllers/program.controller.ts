import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import {
    assignReportMenteeByProgram,
    createProgramApprovedRepo,
    createProgramRepo,
    deleteProgramRepo,
    getAllProgramsRepo,
    getProgramByIdRepo,
    getStatusProgram,
    searchProgramRepo,
    updateProgramRepo,
} from "../services/program.service";
import { getReqVacancyByIdRepo, updateReqVacancyRepo } from "../services/requestVacancy.service";
import { calculateQuarter } from "../utils/calculateQuarter";
import logger from "../utils/logger";
import {
    approvalReqProgramValidation,
    createProgramValidation,
    updateProgramValidation,
} from "../validations/program.validation";

export const createProgramController = async (req: Request, res: Response): Promise<void> => {
    req.body.program_id = uuidv4();
    const { error, value } = createProgramValidation(req.body);

    if (error) {
        logger.info(`ERR: program - create = ${error.details[0].message}`);
        res.status(422).json({
            status: false,
            statusCode: 422,
            message: error.details[0].message,
        });
        return;
    }

    try {
        value.endDate.setHours(23, 59, 59, 999);
        value.status = getStatusProgram(value.start_date);
        value.tw = calculateQuarter(value.end_date);

        await createProgramRepo(value);

        logger.info("Success create new program");
        res.status(201).json({
            status: true,
            statusCode: 201,
            message: "Success create new program",
            data: value,
        });
    } catch (error) {
        logger.error(`ERR: program - create = ${error}`);
        res.status(500).json({
            status: false,
            statusCode: 500,
            message: error,
        });
    }
};

export const getAllProgramsController = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            query: { title },
        } = req;

        const programs = title ? await searchProgramRepo(title.toString()) : await getAllProgramsRepo();

        if (!programs) {
            logger.info("Internal server error");
            res.status(500).json({
                status: false,
                statusCode: 500,
                message: "Internal server error",
                data: [],
            });
            return;
        }

        logger.info("Success get all programs data");
        res.status(200).json({
            status: true,
            statusCode: 200,
            message: "Success get all programs data",
            data: programs,
        });
    } catch (error) {
        logger.info(`ERR: programs - get all = ${error}`);
        res.status(500).json({
            status: false,
            statusCode: 500,
            message: error,
        });
    }
};

export const getProgramByIdController = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            params: { program_id },
        } = req;

        const program = await getProgramByIdRepo(program_id);

        if (!program) {
            logger.info("Program data not found!");
            res.status(404).json({
                status: false,
                statusCode: 404,
                message: "Program data not found!",
                data: {},
            });
            return;
        }

        logger.info("Success get program data");
        res.status(200).json({
            status: true,
            statusCode: 200,
            message: "Success get program data",
            data: program,
        });
    } catch (error) {
        logger.info(`ERR: program - get by id = ${error}`);
        res.status(500).json({
            status: false,
            statusCode: 500,
            message: error,
        });
    }
};

export const updateProgramController = async (req: Request, res: Response): Promise<void> => {
    const {
        params: { program_id },
    } = req;
    const { error, value } = updateProgramValidation(req.body, req.body.journey);

    if (error) {
        logger.info(`ERR: program - update = ${error.details[0].message}`);
        res.status(422).json({
            status: false,
            statusCode: 422,
            message: error.details[0].message,
        });
        return;
    }

    try {
        if (value.start_date) value.status = getStatusProgram(value.start_date);
        if (value.end_date) {
            value.end_date.setHours(23, 59, 59, 999);
            value.tw = calculateQuarter(value.end_date);
        }
        if (value.journey && value.journey === "Offering") value.onBoarding_date.setHours(8, 59, 59, 999);

        const updatedData = await updateProgramRepo(program_id, value);

        if (!updatedData) {
            logger.info("Program data not found!");
            res.status(404).json({
                status: false,
                statusCode: 404,
                message: "Program data not found!",
            });
            return;
        }

        const programExist = await getProgramByIdRepo(program_id);

        if (programExist && programExist.journey === "Working Experience") {
            await assignReportMenteeByProgram(programExist.program_id, programExist.duration);
        }

        logger.info("Success update program data");
        res.status(200).json({
            status: true,
            statusCode: 200,
            message: "Success update program data",
        });
    } catch (error) {
        logger.info(`ERR: program - update = ${error}`);
        res.status(500).json({
            status: false,
            statusCode: 500,
            message: error,
        });
    }
};

export const deleteProgramController = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            params: { program_id },
        } = req;

        const deletedProgram = await deleteProgramRepo(program_id);

        if (!deletedProgram) {
            logger.info("Program data not found!");
            res.status(404).json({
                status: false,
                statusCode: 404,
                message: "Program data not found!",
            });
            return;
        }

        logger.info("Success delete program data");
        res.status(200).json({
            status: true,
            statusCode: 200,
            message: "Success delete program data",
        });
    } catch (error) {
        logger.error(`ERR: program - delete = ${error}`);
        res.status(500).json({
            status: false,
            statusCode: 500,
            message: error,
        });
    }
};

export const approvalReqProgramController = async (req: Request, res: Response): Promise<void> => {
    const {
        params: { reqVacancy_id },
    } = req;
    const { error, value } = approvalReqProgramValidation(req.body);

    if (error) {
        logger.info(`ERR: program - update = ${error.details[0].message}`);
        res.status(422).json({
            status: false,
            statusCode: 422,
            message: error.details[0].message,
        });
        return;
    }

    try {
        const updateData = await updateReqVacancyRepo(reqVacancy_id, value);

        if (!updateData) {
            logger.info("Requested program not found!");
            res.status(404).json({
                status: false,
                statusCode: 404,
                message: "Requested program not found!",
            });
            return;
        }

        if (["Approved", "approved"].includes(value.status)) {
            const newProgramData = await getReqVacancyByIdRepo(reqVacancy_id);

            if (!newProgramData) {
                logger.info("Requested program data not found!");
                res.status(404).json({
                    status: false,
                    statusCode: 404,
                    message: "Requested program data not found!",
                    data: {},
                });
                return;
            }

            await createProgramApprovedRepo(newProgramData, value.quotaGiven);
            logger.info("Approve requested program");
            res.status(201).json({
                status: true,
                statusCode: 201,
                message: "Approve requested program",
            });
            return;
        }
        if (["Rejected", "rejected"].includes(value.status)) {
            logger.info("Reject requested program");
            res.status(200).json({
                status: true,
                statusCode: 200,
                message: "Reject requested program",
            });
            return;
        }
    } catch (error) {
        logger.error(`ERR: requested program - update = ${error}`);
        res.status(500).json({
            status: false,
            statusCode: 500,
            message: error,
        });
    }
};
