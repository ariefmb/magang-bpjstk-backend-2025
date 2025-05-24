import { Request, Response } from "express";
import { getProgramByIdRepo } from "../../services/program.service";
import { v4 as uuidv4 } from "uuid";
import { getApplicantByIdRepo } from "../../services/applicant.service";
import {
    assignZoomRepo,
    deleteAssignZoomRepo,
    getAllAssignZoomsRepo,
    getAssignZoomByIdRepo,
    updateAssignZoomRepo,
} from "../../services/journey services/zoomAssign.service";
import logger from "../../utils/logger";
import {
    assignZoomValidation,
    updateAssignZoomValidation,
} from "../../validations/journey validations/zoomAssign.validation";

export const assignZoomController = async (req: Request, res: Response): Promise<void> => {
    req.body.zoomAssign_id = uuidv4();
    const { error, value } = assignZoomValidation(req.body);

    if (error) {
        logger.info(`ERR: assign zoom - create = ${error.details[0].message}`);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error.details[0].message,
        });
        return;
    }

    try {
        const programData = await getProgramByIdRepo(value.programData);
        if (!programData) {
            logger.info("ERR: assign zoom - create = Program data not found");
            res.status(404).send({
                status: false,
                statusCode: 404,
                message: "ERR: assign zoom - create = Program data not found",
            });
            return;
        }

        const applicantData = await getApplicantByIdRepo(value.applicant_id);
        if (!applicantData) {
            logger.info("ERR: assign zoom - create = Applicant data not found");
            res.status(404).send({
                status: false,
                statusCode: 404,
                message: "ERR: assign zoom - create = Applicant data not found",
            });
            return;
        }

        if (applicantData.program_id !== programData.program_id) {
            logger.info("ERR: assign zoom - create = Program data does not valid");
            res.status(404).send({
                status: false,
                statusCode: 404,
                message: "ERR: assign zoom - create = Program data does not valid",
            });
            return;
        }

        await assignZoomRepo(value);
        logger.info("Success create new zoom assign");
        res.status(201).send({
            status: true,
            statusCode: 201,
            message: "Success create new zoom assign",
            data: value,
        });
    } catch (error) {
        logger.info(`ERR: assign zoom - create = ${error}`);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error,
        });
    }
};

export const getAllAssignZoomsController = async (req: Request, res: Response): Promise<void> => {
    try {
        const zoomAssignDatas = await getAllAssignZoomsRepo();

        if (!zoomAssignDatas) {
            logger.info("Internal server error");
            res.status(500).send({
                status: false,
                statusCode: 500,
                message: "Internal server error",
                data: [],
            });
            return;
        }

        logger.info("Success get all applicants data");
        res.status(200).send({
            status: true,
            statusCode: 200,
            message: "Success get all applicants data",
            data: zoomAssignDatas,
        });
    } catch (error) {
        logger.info(`ERR: assign zoom - get all = ${error}`);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error,
        });
    }
};

export const getAssignZoomByIdController = async (req: Request, res: Response): Promise<void> => {
    const {
        params: { zoomAssign_id },
    } = req;

    try {
        const zoomAssignData = await getAssignZoomByIdRepo(zoomAssign_id);

        if (!zoomAssignData) {
            logger.info("Zoom assign data not found!");
            res.status(404).send({
                status: false,
                statusCode: 404,
                message: "Zoom assign data not found!",
                data: {},
            });
            return;
        }

        logger.info("Success get zoom assign data");
        res.status(200).send({
            status: true,
            statusCode: 200,
            message: "Success get zoom assign data",
            data: zoomAssignData,
        });
    } catch (error) {
        logger.info(`ERR: zoom assign - get by id = ${error}`);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error,
        });
    }
};

export const updateAssignZoomController = async (req: Request, res: Response): Promise<void> => {
    const {
        params: { zoomAssign_id },
    } = req;
    const { error, value } = updateAssignZoomValidation(req.body);

    try {
        if (error) {
            logger.info(`ERR: zoom assign - update = ${error.details[0].message}`);
            res.status(422).send({
                status: false,
                statusCode: 422,
                message: error.details[0].message,
            });
            return;
        }

        const updatedData = await updateAssignZoomRepo(zoomAssign_id, value);

        if (!updatedData) {
            logger.info("Zoom assign data not found!");
            res.status(404).send({
                status: false,
                statusCode: 404,
                message: "Zoom assign data not found!",
            });
            return;
        }

        logger.info("Success update zoom assign data");
        res.status(200).send({
            status: true,
            statusCode: 200,
            message: "Success update zoom assign data",
        });
    } catch (error) {
        logger.error(`ERR: zoom assign - update = ${error}`);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error,
        });
    }
};

export const deleteAssignZoomController = async (req: Request, res: Response): Promise<void> => {
    const {
        params: { zoomAssign_id },
    } = req;

    try {
        const deletedData = await deleteAssignZoomRepo(zoomAssign_id);

        if (!deletedData) {
            logger.info("Zoom assign data not found!");
            res.status(404).send({
                status: false,
                statusCode: 404,
                message: "Zoom assign data not found!",
            });
            return;
        }

        logger.info("Success delete zoom assign data");
        res.status(200).send({
            status: true,
            statusCode: 200,
            message: "Success delete zoom assign data",
        });
    } catch (error) {
        logger.error(`ERR: zoom assign - delete = ${error}`);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error,
        });
    }
};
