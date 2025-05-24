import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { deleteApplicantRepo, getApplicantsToDeleted } from "../services/applicant.service";
import { calculateQuarter, getReqVacancyByIdRepo, updateReqVacancyRepo } from "../services/requestVacancy.service";
import {
    createVacancyApprovedRepo,
    createVacancyRepo,
    deleteVacancyByIdRepo,
    getStatusVacancy,
    getVacanciesRepo,
    getVacancyByIdRepo,
    searchVacancyRepo,
    updateVacancyByIdRepo,
} from "../services/vacancy.service";
import logger from "../utils/logger";
import {
    approvalReqVacancyValidation,
    createVacancyValidation,
    updateVacancyValidation,
} from "../validations/vacancy.validation";

export const createVacancyController = async (req: Request, res: Response): Promise<void> => {
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
            const closingDate = new Date(value.close_vacancy);
            closingDate.setHours(23, 59, 59, 999);
            value.close_vacancy = closingDate;

            value.status = getStatusVacancy(value.open_vacancy, value.close_vacancy);
            value.tw = calculateQuarter(value.close_vacancy);

            await createVacancyRepo(value);
            logger.info("Success create new vacancy");
            res.status(201).send({
                status: true,
                statusCode: 201,
                message: "Success create new vacancy",
                data: value,
            });
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

export const getVacanciesController = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            query: { title },
        } = req;

        const vacancies = title ? await searchVacancyRepo(title.toString()) : await getVacanciesRepo();

        if (!vacancies) {
            logger.info("Internal server error");
            res.status(500).send({
                status: false,
                statusCode: 500,
                message: "Internal server error",
                data: [],
            });
            return;
        }

        logger.info("Success get all vacancies data");
        res.status(200).send({
            status: true,
            statusCode: 200,
            message: "Success get all vacancies data",
            data: vacancies,
        });
    } catch (error) {
        logger.info(`ERR: vacancies - get all = ${error}`);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error,
        });
    }
};

export const getVacancyByIdController = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            params: { vacancy_id },
        } = req;

        const vacancy = await getVacancyByIdRepo(vacancy_id);

        if (!vacancy) {
            logger.info("Vacancy data not found!");
            res.status(404).send({
                status: false,
                statusCode: 404,
                message: "Vacancy data not found!",
                data: {},
            });
            return;
        }

        logger.info("Success get vacancy data");
        res.status(200).send({
            status: true,
            statusCode: 200,
            message: "Success get vacancy data",
            data: vacancy,
        });
    } catch (error) {
        logger.info(`ERR: vacancy - get by id = ${error}`);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error,
        });
    }
};

export const updateVacancyController = async (req: Request, res: Response): Promise<void> => {
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
            if (req.body.close_vacancy) {
                const closingDate = new Date(value.close_vacancy);
                closingDate.setHours(23, 59, 59, 999);
                value.close_vacancy = closingDate;
            }

            const data = await getVacancyByIdRepo(vacancy_id);

            if (data) {
                value.status = getStatusVacancy(data.open_vacancy, data.close_vacancy);
                value.tw = calculateQuarter(data.close_vacancy);
            }

            const updateData = await updateVacancyByIdRepo(vacancy_id, value);

            if (!updateData) {
                logger.info("Vacancy not found!");
                res.status(404).send({
                    status: false,
                    statusCode: 404,
                    message: "Vacancy not found!",
                });
                return;
            }

            logger.info("Success update vacancy data");
            res.status(200).send({
                status: true,
                statusCode: 200,
                message: "Success update vacancy data",
            });
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

export const deleteVacancyController = async (req: Request, res: Response): Promise<void> => {
    const {
        params: { vacancy_id },
    } = req;

    try {
        const applicantsToDelete = await getApplicantsToDeleted(vacancy_id);

        if (applicantsToDelete) {
            await Promise.all(
                applicantsToDelete.map(async (applicant) => {
                    await deleteApplicantRepo(applicant.applicant_id);
                })
            );
        }

        const deletedData = await deleteVacancyByIdRepo(vacancy_id);
        if (deletedData) {
            logger.info("Success delete vacancy data");
            res.status(200).send({
                status: true,
                statusCode: 200,
                message: "Success delete vacancy data",
            });
        } else {
            logger.info("Vacancy data not found!");
            res.status(404).send({
                status: false,
                statusCode: 404,
                message: "Vacancy data not found!",
            });
        }
    } catch (error) {
        logger.error(`ERR: vacancy - delete = ${error}`);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error,
        });
    }
};

export const approvalReqVacancyController = async (req: Request, res: Response): Promise<void> => {
    const {
        params: { reqVacancy_id },
    } = req;
    const { error, value } = approvalReqVacancyValidation(req.body);

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
            }

            const updateData = await updateReqVacancyRepo(reqVacancy_id, value);

            if (!updateData) {
                logger.info("Vacancy not found!");
                res.status(404).send({
                    status: false,
                    statusCode: 404,
                    message: "Vacancy not found!",
                });
                return;
            }

            if (["Approved", "approved"].includes(value.status)) {
                const newVacancyData = await getReqVacancyByIdRepo(reqVacancy_id);

                if (!newVacancyData) {
                    logger.info("Requested vacancy data not found!");
                    res.status(404).send({
                        status: false,
                        statusCode: 404,
                        message: "Requested vacancy data not found!",
                        data: {},
                    });
                    return;
                }
                await createVacancyApprovedRepo(newVacancyData, value.quotaGiven);
                logger.info("Success approved requested vacancy");
                res.status(201).send({
                    status: true,
                    statusCode: 201,
                    message: "Success approved requested vacancy",
                });
                return;
            }
            if (["Rejected", "rejected"].includes(value.status)) {
                logger.info("Success rejected requested vacancy");
                res.status(200).send({
                    status: true,
                    statusCode: 200,
                    message: "Success rejected requested vacancy",
                });
                return;
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
