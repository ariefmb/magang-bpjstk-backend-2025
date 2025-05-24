import { Request, Response } from "express";
import { getProgramByIdRepo } from "src/services/program.service";
import { v4 as uuidv4 } from "uuid";
import { getApplicantByIdRepo } from "../../services/applicant.service";
import {
    deleteReportMenteeRepo,
    getAllReportMenteesRepo,
    getReportMenteeByIdRepo,
    reportMenteeRepo,
    updateReportMenteeRepo,
} from "../../services/journey services/reportMentee.service";
import logger from "../../utils/logger";
import {
    reportMenteeValidation,
    updateReportMenteeValidation,
} from "../../validations/journey validations/reportMentee.validation";

export const createReportMenteeController = async (req: Request, res: Response): Promise<void> => {
    req.body.reportMentee_id = uuidv4();
    const { error, value } = reportMenteeValidation(req.body);

    if (error) {
        logger.info(`ERR: report mentee - create = ${error.details[0].message}`);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error.details[0].message,
        });
        return;
    }

    try {
        const programData = await getProgramByIdRepo(value.program_id);
        if (!programData) {
            logger.info("ERR: report mentee - create = Program data not found");
            res.status(404).send({
                status: false,
                statusCode: 404,
                message: "ERR: report mentee - create = Program data not found",
            });
            return;
        }

        const applicantData = await getApplicantByIdRepo(value.applicant_id);
        if (!applicantData) {
            logger.info("ERR: report mentee - create = Applicant data not found");
            res.status(404).send({
                status: false,
                statusCode: 404,
                message: "ERR: report mentee - create = Applicant data not found",
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

        await reportMenteeRepo(value);
        logger.info("Success create new mentee report");
        res.status(201).send({
            status: true,
            statusCode: 201,
            message: "Success create new mentee report",
            data: value,
        });
    } catch (error) {
        logger.info(`ERR: report mentee - create = ${error}`);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error,
        });
    }
};

export const getAllReportMenteesController = async (req: Request, res: Response): Promise<void> => {
    try {
        const reportMenteeDatas = await getAllReportMenteesRepo();

        if (!reportMenteeDatas) {
            logger.info("Internal server error");
            res.status(500).send({
                status: false,
                statusCode: 500,
                message: "Internal server error",
                data: [],
            });
            return;
        }

        logger.info("Success get all report mentee datas");
        res.status(200).send({
            status: true,
            statusCode: 200,
            message: "Success get all report mentee datas",
            data: reportMenteeDatas,
        });
    } catch (error) {
        logger.info(`ERR: report mentee - get all = ${error}`);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error,
        });
    }
};

export const getReportMenteeByIdController = async (req: Request, res: Response): Promise<void> => {
    const {
        params: { reportMentee_id },
    } = req;

    try {
        const reportData = await getReportMenteeByIdRepo(reportMentee_id);

        if (!reportData) {
            logger.info("Report mentee data not found!");
            res.status(404).send({
                status: false,
                statusCode: 404,
                message: "Report mentee data not found!",
                data: {},
            });
            return;
        }

        logger.info("Success get report mentee data");
        res.status(200).send({
            status: true,
            statusCode: 200,
            message: "Success get report mentee data",
            data: reportData,
        });
    } catch (error) {
        logger.info(`ERR: report mentee - get by id = ${error}`);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error,
        });
    }
};

export const updateReportMenteeController = async (req: Request, res: Response): Promise<void> => {
    const {
        params: { reportMentee_id },
    } = req;
    const { error, value } = updateReportMenteeValidation(req.body);

    try {
        if (error) {
            logger.info(`ERR: report mentee - update = ${error.details[0].message}`);
            res.status(422).send({
                status: false,
                statusCode: 422,
                message: error.details[0].message,
            });
            return;
        }

        const updatedData = await updateReportMenteeRepo(reportMentee_id, value);

        if (!updatedData) {
            logger.info("Report mentee data not found!");
            res.status(404).send({
                status: false,
                statusCode: 404,
                message: "Report mentee data not found!",
            });
            return;
        }

        logger.info("Success update report mentee data");
        res.status(200).send({
            status: true,
            statusCode: 200,
            message: "Success update report mentee data",
        });
    } catch (error) {
        logger.error(`ERR: report mentee - update = ${error}`);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error,
        });
    }
};

export const deleteReportMenteeController = async (req: Request, res: Response): Promise<void> => {
    const {
        params: { reportMentee_id },
    } = req;

    try {
        const deletedData = await deleteReportMenteeRepo(reportMentee_id);

        if (!deletedData) {
            logger.info("Report mentee data not found!");
            res.status(404).send({
                status: false,
                statusCode: 404,
                message: "Report mentee data not found!",
            });
            return;
        }

        logger.info("Success delete report mentee data");
        res.status(200).send({
            status: true,
            statusCode: 200,
            message: "Success delete report mentee data",
        });
    } catch (error) {
        logger.error(`ERR: report mentee - delete = ${error}`);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error,
        });
    }
};
