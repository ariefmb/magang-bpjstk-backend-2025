import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import {
    addApplicantRepo,
    deleteApplicantRepo,
    getApplicantByIdRepo,
    getApplicantsByEmailRepo,
    getApplicantsRepo,
    searchApplicantsRepo,
    updateApplicantRepo,
} from "../services/applicant.service";
import { getProgramByIdRepo } from "../services/program.service";
import logger from "../utils/logger";
import { uploadAndDelete } from "../utils/uploadToDrive";
import { addApplicantValidation, updateApplicantValidation } from "../validations/applicant.validation";

export const addApplicantController = async (req: Request, res: Response): Promise<void> => {
    req.body.applicant_id = uuidv4();
    const { error, value } = addApplicantValidation(req.body);

    if (error) {
        logger.info(`ERR: applicant - add = ${error.details[0].message}`);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error.details[0].message,
        });
    } else {
        try {
            const user = res.locals.user;

            if (user._doc.email !== value.email) {
                logger.info("ERR: applicant - add = user email does not valid");
                res.status(422).send({
                    status: false,
                    statusCode: 422,
                    message: "user email does not valid",
                });
            } else {
                const programExist = await getProgramByIdRepo(value.program_id);

                if (!programExist) {
                    logger.info("ERR: applicant - add = program does not exist");
                    res.status(404).send({
                        status: false,
                        statusCode: 404,
                        message: "program does not exist",
                    });
                } else {
                    if (programExist.status !== "Active") {
                        logger.info("ERR: applicant - add = program does not open");
                        res.status(422).send({
                            status: false,
                            statusCode: 422,
                            message: "program does not open",
                        });
                        return;
                    }

                    const applicantsExist = await getApplicantsByEmailRepo(value.email);

                    const hasOnGoingProgram = applicantsExist.some(
                        (applicant) => !["Off Boarding", "Rejected"].includes(applicant.status)
                    );

                    if (hasOnGoingProgram) {
                        logger.info("ERR: applicant - add = applicant has on going program");
                        res.status(422).send({
                            status: false,
                            statusCode: 422,
                            message: "Applicant has on going program",
                        });
                        return;
                    }

                    const files = req.files as {
                        [fieldname: string]: Express.Multer.File[];
                    };

                    const applicantDataMapper = {
                        ...value,
                        photo: await uploadAndDelete(files.photo[0], ["jpg", "jpeg", "png"]),
                        suratPengantar: await uploadAndDelete(files.suratPengantar[0], ["pdf", "docx"]),
                        cv: await uploadAndDelete(files.cv[0], ["pdf", "docx"]),
                        portfolio: await uploadAndDelete(files.portfolio[0], ["pdf", "docx"]),
                    };

                    console.log("applicantDataMapper", applicantDataMapper);

                    await addApplicantRepo(applicantDataMapper);
                    logger.info("Success add new applicant");
                    res.status(201).send({
                        status: true,
                        statusCode: 201,
                        message: "Success add new applicant",
                        data: value,
                    });
                }
            }
        } catch (error) {
            logger.info(`ERR: applicant - add = ${error}`);
            res.status(422).send({
                status: false,
                statusCode: 422,
                message: error instanceof Error ? error.message : error,
            });
        }
    }
};

export const getAllApplicantsController = async (req: Request, res: Response) => {
    try {
        const {
            query: { name },
        } = req;

        const applicants = name ? await searchApplicantsRepo(name.toString()) : await getApplicantsRepo();

        if (applicants) {
            logger.info("Success get all applicants data");
            res.status(200).send({
                status: true,
                statusCode: 200,
                message: "Success get all applicants data",
                data: applicants,
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
        logger.info(`ERR: applicants - get all = ${error}`);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error,
        });
    }
};

export const getApplicantByIdController = async (req: Request, res: Response) => {
    const {
        params: { applicant_id },
    } = req;

    try {
        const applicant = await getApplicantByIdRepo(applicant_id);

        if (applicant) {
            logger.info("Success get applicant data");
            res.status(200).send({
                status: true,
                statusCode: 200,
                message: "Success get applicant data",
                data: applicant,
            });
        } else {
            logger.info("Applicant data not found!");
            res.status(404).send({
                status: false,
                statusCode: 404,
                message: "Applicant data not found!",
                data: {},
            });
        }
    } catch (error) {
        logger.info(`ERR: applicant - get by id = ${error}`);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error,
        });
    }
};

export const updateApplicantController = async (req: Request, res: Response): Promise<void> => {
    const {
        params: { applicant_id },
    } = req;
    const { error, value } = updateApplicantValidation(req.body, req.body.journey);

    if (error) {
        logger.info(`ERR: applicant - update = ${error.details[0].message}`);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error.details[0].message,
        });
        return;
    }

    try {
        const user = res.locals.user;

        if (user._doc.email !== value.email && user._doc.role !== "admin") {
            logger.info("ERR: applicant - update = this user have no access");
            res.status(422).send({
                status: false,
                statusCode: 422,
                message: "this user have no access",
            });
            return;
        }

        const files = req.files as {
            [fieldname: string]: Express.Multer.File[];
        };

        const applicantDataMapper = {
            ...value,
        };

        if (files.photo?.[0]) applicantDataMapper.photo = await uploadAndDelete(files.photo[0], ["jpg", "jpeg", "png"]);
        if (files.suratPengantar?.[0])
            applicantDataMapper.suratPengantar = await uploadAndDelete(files.suratPengantar[0], ["pdf", "docx"]);
        if (files.cv?.[0]) applicantDataMapper.cv = await uploadAndDelete(files.cv[0], ["pdf", "docx"]);
        if (files.portfolio?.[0])
            applicantDataMapper.portfolio = await uploadAndDelete(files.portfolio[0], ["pdf", "docx"]);
        if (files.surat_kuasa?.[0])
            applicantDataMapper.surat_kuasa = await uploadAndDelete(files.surat_kuasa[0], ["pdf", "docx"]);
        if (files.surat_perjanjian?.[0])
            applicantDataMapper.surat_perjanjian = await uploadAndDelete(files.surat_perjanjian[0], ["pdf", "docx"]);
        if (files.suratPeminjaman_idCard?.[0])
            applicantDataMapper.suratPeminjaman_idCard = await uploadAndDelete(files.suratPeminjaman_idCard[0], [
                "pdf",
                "docx",
            ]);

        const updateData = await updateApplicantRepo(applicant_id, applicantDataMapper);

        if (!updateData) {
            logger.info("Applicant data not found!");
            res.status(404).send({
                status: false,
                statusCode: 404,
                message: "Applicant data not found!",
            });
            return;
        }

        logger.info("Success update applicant data");
        res.status(200).send({
            status: true,
            statusCode: 200,
            message: "Success update applicant data",
        });
    } catch (error) {
        logger.error(`ERR: applicant - update = ${error}`);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error,
        });
    }
};

export const deleteApplicantController = async (req: Request, res: Response) => {
    const {
        params: { applicant_id },
    } = req;

    try {
        const deletedData = await deleteApplicantRepo(applicant_id);

        if (deletedData) {
            logger.info("Success delete applicant data");
            res.status(200).send({
                status: true,
                statusCode: 200,
                message: "Success delete applicant data",
            });
        } else {
            logger.info("Applicant data not found!");
            res.status(404).send({
                status: false,
                statusCode: 404,
                message: "Applicant data not found!",
            });
        }
    } catch (error) {
        logger.error(`ERR: applicant - delete = ${error}`);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error,
        });
    }
};
