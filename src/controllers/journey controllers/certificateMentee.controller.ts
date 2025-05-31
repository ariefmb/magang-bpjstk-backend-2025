import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { getApplicantByIdRepo, updateApplicantRepo } from "../../services/applicant.service";
import {
    addCertificateMenteeRepo,
    deleteCertificateMenteeRepo,
    getAllCertificateMenteesRepo,
    getCertificateMenteeByIdRepo,
    updateCertificateMenteeRepo,
} from "../../services/journey services/certificateMentee.service";
import { getProgramByIdRepo } from "../../services/program.service";
import logger from "../../utils/logger";
import { uploadAndDelete } from "../../utils/uploadToDrive";
import { addCertificateMenteeValidation } from "../../validations/journey validations/certificateMentee.validation";

export const addCertificateMenteeController = async (req: Request, res: Response): Promise<void> => {
    req.body.certificateMentee_id = uuidv4();
    const { error, value } = addCertificateMenteeValidation(req.body);

    if (error) {
        logger.info(`ERR: certificate mentee - add = ${error.details[0].message}`);
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
            logger.info("ERR: certificate mentee - create = Program data not found");
            res.status(404).send({
                status: false,
                statusCode: 404,
                message: "create = Program data not found",
            });
            return;
        }

        const applicantData = await getApplicantByIdRepo(value.applicant_id);
        if (!applicantData) {
            logger.info("ERR: certificate mentee - create = Applicant data not found");
            res.status(404).send({
                status: false,
                statusCode: 404,
                message: "create = Applicant data not found",
            });
            return;
        }

        if (applicantData.program_id !== programData.program_id) {
            logger.info("ERR: assign zoom - create = Program data does not valid");
            res.status(404).send({
                status: false,
                statusCode: 404,
                message: "Program data does not valid",
            });
            return;
        }

        const files = req.files as {
            [fieldname: string]: Express.Multer.File[];
        };

        const certificateMenteeDataMapper = {
            ...value,
            certificate: await uploadAndDelete(files.certificate[0], ["pdf"]),
        };

        await addCertificateMenteeRepo(certificateMenteeDataMapper);

        const updateData = {
            applicant_id: applicantData.applicant_id,
            program_id: applicantData.program_id,
            user_id: applicantData.user_id,
            name: applicantData.name,
            nik: applicantData.nik,
            email: applicantData.email,
            contact: applicantData.contact,
            photo: applicantData.photo,
            institution: applicantData.institution,
            major: applicantData.major,
            semester: applicantData.semester,
            no_suratPengantar: applicantData.no_suratPengantar,
            suratPengantar: applicantData.suratPengantar,
            cv: applicantData.cv,
            portfolio: applicantData.portfolio,
            no_rekening: applicantData.no_rekening,
            surat_kuasa: applicantData.surat_kuasa,
            nama_bukuRek: applicantData.nama_bukuRek,
            bank: applicantData.bank,
            surat_perjanjian: applicantData.surat_perjanjian,
            suratPeminjaman_idCard: applicantData.suratPeminjaman_idCard,
            journey: applicantData.journey,
            status: "Off Boarding",
        };

        await updateApplicantRepo(applicantData.applicant_id, updateData);

        logger.info("Success add certificate mentee");
        res.status(201).send({
            status: true,
            statusCode: 201,
            message: "Success add certificate mentee",
            data: certificateMenteeDataMapper,
        });
    } catch (error) {
        logger.info(`ERR sys: certificate mentee - create = ${error}`);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error instanceof Error ? error.message : error,
        });
    }
};

export const getAllCertificateMenteesController = async (req: Request, res: Response): Promise<void> => {
    try {
        const certificateMenteeDatas = await getAllCertificateMenteesRepo();

        if (!certificateMenteeDatas) {
            logger.info("Internal server error");
            res.status(500).send({
                status: false,
                statusCode: 500,
                message: "Internal server error",
                data: [],
            });
            return;
        }

        logger.info("Success get all certificate mentee datas");
        res.status(200).send({
            status: true,
            statusCode: 200,
            message: "Success get all certificate mentee datas",
            data: certificateMenteeDatas,
        });
    } catch (error) {
        logger.info(`ERR: certificate mentee - get all = ${error}`);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error,
        });
    }
};

export const getCertificateMenteeByIdController = async (req: Request, res: Response): Promise<void> => {
    const {
        params: { certificateMentee_id },
    } = req;

    try {
        const certificateData = await getCertificateMenteeByIdRepo(certificateMentee_id);

        if (!certificateData) {
            logger.info("Certificate data not found!");
            res.status(404).send({
                status: false,
                statusCode: 404,
                message: "Certificate data not found!",
                data: {},
            });
            return;
        }

        logger.info("Success get certificate data");
        res.status(200).send({
            status: true,
            statusCode: 200,
            message: "Success get certificate data",
            data: certificateData,
        });
    } catch (error) {
        logger.info(`ERR: certificate mentee - get by id = ${error}`);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error,
        });
    }
};

export const updateCertificateMenteeController = async (req: Request, res: Response): Promise<void> => {
    const {
        params: { certificateMentee_id },
    } = req;

    try {
        const existCertificateData = await getCertificateMenteeByIdRepo(certificateMentee_id);
        if (!existCertificateData) {
            logger.info("Certificate mentee data not found!");
            res.status(404).send({
                status: false,
                statusCode: 404,
                message: "Certificate mentee data not found!",
            });
            return;
        }

        const files = req.files as {
            [fieldname: string]: Express.Multer.File[];
        };

        const certificateMenteeDataMapper = {
            certificateMentee_id: certificateMentee_id,
            program_id: existCertificateData.program_id,
            applicant_id: existCertificateData.applicant_id,
            certificate: await uploadAndDelete(files.certificate[0], ["pdf"]),
        };

        const updatedData = await updateCertificateMenteeRepo(certificateMentee_id, certificateMenteeDataMapper);

        if (!updatedData) {
            logger.info("Certificate data not found!");
            res.status(404).send({
                status: false,
                statusCode: 404,
                message: "Certificate data not found!",
            });
            return;
        }

        logger.info("Success update certificate mentee data");
        res.status(200).send({
            status: true,
            statusCode: 200,
            message: "Success update certificate mentee data",
        });
    } catch (error) {
        logger.error(`ERR: certificate mentee - update = ${error}`);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error,
        });
    }
};

export const deleteCertificateMenteeController = async (req: Request, res: Response): Promise<void> => {
    const {
        params: { certificateMentee_id },
    } = req;

    try {
        const deletedData = await deleteCertificateMenteeRepo(certificateMentee_id);

        if (!deletedData) {
            logger.info("Certificate data not found!");
            res.status(404).send({
                status: false,
                statusCode: 404,
                message: "Certificate data not found!",
            });
            return;
        }

        logger.info("Success delete certificate mentee data");
        res.status(200).send({
            status: true,
            statusCode: 200,
            message: "Success delete certificate mentee data",
        });
    } catch (error) {
        logger.error(`ERR: certificate mentee - delete = ${error}`);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error,
        });
    }
};
