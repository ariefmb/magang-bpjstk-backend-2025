// import { Request, Response } from "express";
// import { calculateQuarter } from "src/utils/calculateQuarter";
// import { v4 as uuidv4 } from "uuid";
// import { deleteApplicantRepo, getApplicantsToDeleted } from "../services/applicant.service";
// import { createProgramRepo, updateProgramRepoByIdVacancy } from "../services/programTracker.service";
// import { getReqVacancyByIdRepo, updateReqVacancyRepo } from "../services/requestProgram.service";
// import {
//     createVacancyApprovedRepo,
//     createVacancyRepo,
//     deleteVacancyByIdRepo,
//     getStatusProgram,
//     getVacanciesRepo,
//     getVacancyByIdRepo,
//     searchVacancyRepo,
//     updateVacancyByIdRepo,
// } from "../services/vacancy.service";
// import logger from "../utils/logger";
// import {
//     approvalReqVacancyValidation,
//     createVacancyValidation,
//     updateVacancyValidation,
// } from "../validations/vacancy.validation";

// export const createVacancyController = async (req: Request, res: Response): Promise<void> => {
//     req.body.vacancy_id = uuidv4();
//     const { error, value } = createVacancyValidation(req.body);

//     if (error) {
//         logger.info(`ERR: vacancy - create = ${error.details[0].message}`);
//         res.status(422).send({
//             status: false,
//             statusCode: 422,
//             message: error.details[0].message,
//         });
//     } else {
//         try {
//             const closingDate = new Date(value.close_vacancy);
//             closingDate.setHours(23, 59, 59, 999);
//             value.close_vacancy = closingDate;

//             value.status = getStatusProgram(value.open_vacancy, value.close_vacancy);
//             value.tw = calculateQuarter(value.close_vacancy);

//             await createVacancyRepo(value);

//             if (["Open", "open"].includes(value.status)) {
//                 const iniciateProgramTracker = {
//                     programTracker_id: uuidv4(),
//                     vacancy_id: value.vacancy_id,
//                     unit: value.unit,
//                     mentor_name: value.mentor_name,
//                     contact: value.contact,
//                     working_model: value.working_model,
//                     city: value.city,
//                     location: "",
//                     journey: "Administration",
//                     start_date: value.open_vacancy,
//                     end_date: value.close_vacancy,
//                     onBoarding_date: null,
//                     template_suratPerjanjian: "",
//                     template_suratPeminjamanIDCard: "",
//                     template_logbook: "",
//                     template_laporan: "",
//                     link_group: "",
//                 };

//                 await createProgramRepo(iniciateProgramTracker);
//             }

//             logger.info("Success create new vacancy");
//             res.status(201).send({
//                 status: true,
//                 statusCode: 201,
//                 message: "Success create new vacancy",
//                 data: value,
//             });
//         } catch (error) {
//             logger.info(`ERR: vacancy - create = ${error}`);
//             res.status(422).send({
//                 status: false,
//                 statusCode: 422,
//                 message: error,
//             });
//         }
//     }
// };

// export const getVacanciesController = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const {
//             query: { title },
//         } = req;

//         const vacancies = title ? await searchVacancyRepo(title.toString()) : await getVacanciesRepo();

//         if (!vacancies) {
//             logger.info("Internal server error");
//             res.status(500).send({
//                 status: false,
//                 statusCode: 500,
//                 message: "Internal server error",
//                 data: [],
//             });
//             return;
//         }

//         logger.info("Success get all vacancies data");
//         res.status(200).send({
//             status: true,
//             statusCode: 200,
//             message: "Success get all vacancies data",
//             data: vacancies,
//         });
//     } catch (error) {
//         logger.info(`ERR: vacancies - get all = ${error}`);
//         res.status(422).send({
//             status: false,
//             statusCode: 422,
//             message: error,
//         });
//     }
// };

// export const getVacancyByIdController = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const {
//             params: { vacancy_id },
//         } = req;

//         const vacancy = await getVacancyByIdRepo(vacancy_id);

//         if (!vacancy) {
//             logger.info("Vacancy data not found!");
//             res.status(404).send({
//                 status: false,
//                 statusCode: 404,
//                 message: "Vacancy data not found!",
//                 data: {},
//             });
//             return;
//         }

//         logger.info("Success get vacancy data");
//         res.status(200).send({
//             status: true,
//             statusCode: 200,
//             message: "Success get vacancy data",
//             data: vacancy,
//         });
//     } catch (error) {
//         logger.info(`ERR: vacancy - get by id = ${error}`);
//         res.status(422).send({
//             status: false,
//             statusCode: 422,
//             message: error,
//         });
//     }
// };

// export const updateVacancyController = async (req: Request, res: Response): Promise<void> => {
//     const {
//         params: { vacancy_id },
//     } = req;
//     const { error, value } = updateVacancyValidation(req.body);

//     if (error) {
//         logger.info(`ERR: vacancy - update = ${error.details[0].message}`);
//         res.status(422).send({
//             status: false,
//             statusCode: 422,
//             message: error.details[0].message,
//         });
//     } else {
//         try {
//             if (value.close_vacancy) {
//                 const closingDate = new Date(value.close_vacancy);
//                 closingDate.setHours(23, 59, 59, 999);
//                 value.close_vacancy = closingDate;
//             }

//             const data = await getVacancyByIdRepo(vacancy_id);

//             if (data) {
//                 value.status = getStatusProgram(data.open_vacancy, data.close_vacancy);
//                 value.tw = calculateQuarter(data.close_vacancy);
//             }

//             const programTrackerMapper = {
//                 ...value,
//                 // unit: value.unit || programData.unit,
//                 // mentor_name: value.mentor_name || programData.mentor_name,
//                 // contact: value.contact || programData.contact,
//                 // working_model: value.working_model || programData.working_model,
//                 // city: value.city || programData.city,
//                 // start_date: ["Closed", "closed"].includes(value.status) ? programData.start_date : data?.open_vacancy,
//                 // end_date: ["Closed", "closed"].includes(value.status) ? programData.end_date : data?.close_vacancy,
//             };

//             console.log(`value`, value);
//             console.log(`programTrackerMapper`, programTrackerMapper);
//             console.log(value.status);

//             const updateData = await updateVacancyByIdRepo(vacancy_id, value);

//             if (!updateData) {
//                 logger.info("Vacancy not found!");
//                 res.status(404).send({
//                     status: false,
//                     statusCode: 404,
//                     message: "Vacancy not found!",
//                 });
//                 return;
//             }

//             const updatedProgramData = await updateProgramRepoByIdVacancy(vacancy_id, value);
//             console.log("vacancy_id:", vacancy_id, "updatedProgramData:", updatedProgramData);

//             if (!updatedProgramData) {
//                 logger.info("Tracker data not found!");
//                 res.status(404).send({
//                     status: false,
//                     statusCode: 404,
//                     message: "Tracker data not found!",
//                 });
//                 return;
//             }

//             logger.info("Success update vacancy data");
//             res.status(200).send({
//                 status: true,
//                 statusCode: 200,
//                 message: "Success update vacancy data",
//             });
//         } catch (error) {
//             logger.error(`ERR: vacancy - update = ${error}`);
//             res.status(422).send({
//                 status: false,
//                 statusCode: 422,
//                 message: error,
//             });
//         }
//     }
// };

// export const deleteVacancyController = async (req: Request, res: Response): Promise<void> => {
//     const {
//         params: { vacancy_id },
//     } = req;

//     try {
//         const applicantsToDelete = await getApplicantsToDeleted(vacancy_id);

//         if (applicantsToDelete) {
//             await Promise.all(
//                 applicantsToDelete.map(async (applicant) => {
//                     await deleteApplicantRepo(applicant.applicant_id);
//                 })
//             );
//         }

//         const deletedData = await deleteVacancyByIdRepo(vacancy_id);
//         if (!deletedData) {
//             logger.info("Vacancy data not found!");
//             res.status(404).send({
//                 status: false,
//                 statusCode: 404,
//                 message: "Vacancy data not found!",
//             });
//             return;
//         }

//         logger.info("Success delete vacancy data");
//         res.status(200).send({
//             status: true,
//             statusCode: 200,
//             message: "Success delete vacancy data",
//         });
//     } catch (error) {
//         logger.error(`ERR: vacancy - delete = ${error}`);
//         res.status(422).send({
//             status: false,
//             statusCode: 422,
//             message: error,
//         });
//     }
// };

// export const approvalReqVacancyController = async (req: Request, res: Response): Promise<void> => {
//     const {
//         params: { reqVacancy_id },
//     } = req;
//     const { error, value } = approvalReqVacancyValidation(req.body);

//     if (error) {
//         logger.info(`ERR: vacancy - update = ${error.details[0].message}`);
//         res.status(422).send({
//             status: false,
//             statusCode: 422,
//             message: error.details[0].message,
//         });
//     } else {
//         try {
//             if (req.body.open_vacancy || req.body.close_vacancy) {
//                 const closingDate = new Date(value.close_vacancy);
//                 closingDate.setHours(23, 59, 59, 999);
//                 value.close_vacancy = closingDate;
//             }

//             const updateData = await updateReqVacancyRepo(reqVacancy_id, value);

//             if (!updateData) {
//                 logger.info("Vacancy not found!");
//                 res.status(404).send({
//                     status: false,
//                     statusCode: 404,
//                     message: "Vacancy not found!",
//                 });
//                 return;
//             }

//             if (["Approved", "approved"].includes(value.status)) {
//                 const newVacancyData = await getReqVacancyByIdRepo(reqVacancy_id);

//                 if (!newVacancyData) {
//                     logger.info("Requested vacancy data not found!");
//                     res.status(404).send({
//                         status: false,
//                         statusCode: 404,
//                         message: "Requested vacancy data not found!",
//                         data: {},
//                     });
//                     return;
//                 }
//                 await createVacancyApprovedRepo(newVacancyData, value.quotaGiven);
//                 logger.info("Success approved requested vacancy");
//                 res.status(201).send({
//                     status: true,
//                     statusCode: 201,
//                     message: "Success approved requested vacancy",
//                 });
//                 return;
//             }
//             if (["Rejected", "rejected"].includes(value.status)) {
//                 logger.info("Success rejected requested vacancy");
//                 res.status(200).send({
//                     status: true,
//                     statusCode: 200,
//                     message: "Success rejected requested vacancy",
//                 });
//                 return;
//             }
//         } catch (error) {
//             logger.error(`ERR: vacancy - update = ${error}`);
//             res.status(422).send({
//                 status: false,
//                 statusCode: 422,
//                 message: error,
//             });
//         }
//     }
// };
