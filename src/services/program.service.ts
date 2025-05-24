import cron from "node-cron";
import { ProgramInterface } from "../interfaces/program.interface";
import programModel from "../models/program.model";
import { v4 as uuidv4 } from "uuid";
import { requestVacancyInterface } from "../interfaces/requestVacancy.interface";
import vacancyModel from "../models/vacancy.model";
import logger from "../utils/logger";
import { getManyApplicantsByIdVacancy } from "./applicant.service";
import { reportMenteeRepo } from "./journey services/reportMentee.service";

export const createProgramRepo = async (payload: ProgramInterface) => {
    return await programModel.create(payload);
};

export const getAllProgramsRepo = async () => {
    return await programModel.find();
};

export const searchProgramRepo = async (title: string) => {
    return await programModel.find({ title: { $regex: title, $options: "i" } });
};

export const getProgramByIdRepo = async (id: string) => {
    return await programModel.findOne({ program_id: id });
};

export const updateProgramRepo = async (id: string, payload: ProgramInterface) => {
    return await programModel.findOneAndUpdate({ program_id: id }, { $set: payload });
};

export const assignReportMenteeByProgram = async (program_id: string, duration: number) => {
    const mentees: any = await getManyApplicantsByIdVacancy(program_id);
    if (mentees.length > 0) {
        for (const mentee of mentees) {
            for (let i = 0; i < duration; i++) {
                const reportMenteeAssign = {
                    reportMentee_id: uuidv4(),
                    program_id: program_id,
                    applicant_id: mentee.applicant_id,
                    title: `Logbook bulan ke-${i + 1}`,
                    report: "",
                    feedback_mentee: "",
                    feedback_to_mentor: "",
                    status: "Waiting",
                    feedback_mentor: [],
                };

                await reportMenteeRepo(reportMenteeAssign);
                logger.info(`Success create report ${i} assignment`);
            }
            const finalReportMenteeAssign = {
                reportMentee_id: uuidv4(),
                program_id: program_id,
                applicant_id: mentee.applicant_id,
                title: "Laporan Akhir Magang",
                report: "",
                feedback_mentee: "",
                feedback_to_mentor: "",
                status: "Waiting",
                feedback_mentor: [],
            };

            await reportMenteeRepo(finalReportMenteeAssign);
            logger.info(`Success create final report assignment`);
        }
    }
};

export const deleteProgramRepo = async (id: string) => {
    return await programModel.findOneAndDelete({ program_id: id });
};

cron.schedule("0 0 * * *", async () => {
    const now = new Date();

    try {
        await vacancyModel.updateMany({ status: "Pending", open_vacancy: { $lte: now } }, { $set: { status: "Open" } });
        await vacancyModel.updateMany({ status: "Open", close_vacanncy: { $lt: now } }, { $set: { status: "Closed" } });

        // const openVacancies = await vacancyModel.find({ status: "Open" });

        // if (openVacancies.length > 0) {
        //     for (const vacancy of openVacancies) {
        //         const existingTracker = await getProgramTrackerByIdVacancy(vacancy.vacancy_id);

        //         if (!existingTracker) {
        //             const iniciateProgramTracker = {
        //                 programTracker_id: uuidv4(),
        //                 vacancy_id: vacancy.vacancy_id,
        //                 unit: vacancy.unit,
        //                 mentor_name: vacancy.mentor_name,
        //                 contact: vacancy.contact,
        //                 working_model: vacancy.working_model,
        //                 city: vacancy.city,
        //                 location: "",
        //                 journey: "Administration",
        //                 start_date: vacancy.open_vacancy,
        //                 end_date: vacancy.close_vacancy,
        //                 onBoarding_date: null,
        //                 template_suratPerjanjian: "",
        //                 template_suratPeminjamanIDCard: "",
        //                 template_logbook: "",
        //                 template_laporan: "",
        //                 link_group: "",
        //             };

        //             await createProgramRepo(iniciateProgramTracker);
        //         }
        //     }
        // }

        logger.info(`[CRON] updated report(s) to "Overdue".`);
    } catch (error) {
        logger.info(`[CRON ERROR] Failed to update status to Overdue ${error}`);
    }
});

export const getStatusProgram = (openDate: Date) => {
    const thisTime: Date = new Date();
    return openDate < thisTime ? "Pending" : "Active";
};

export const createProgramApprovedRepo = async (payload: requestVacancyInterface, quotaGiven: number) => {
    const {
        reqVacancy_id,
        title,
        unit,
        mentor_name,
        mentor_email,
        contact,
        position,
        tw,
        duration,
        city,
        location,
        working_model,
        open_vacancy,
        close_vacancy,
        description,
    } = payload;

    const newStatus = getStatusProgram(open_vacancy);

    const newProgramDataMapper: ProgramInterface = {
        program_id: reqVacancy_id,
        title: title,
        status: newStatus,
        unit: unit,
        mentor_name: mentor_name,
        mentor_email: mentor_email,
        contact: contact,
        position: position,
        quota: quotaGiven,
        tw: tw,
        duration: duration,
        city: city,
        location: location,
        working_model: working_model,
        journey: "Administration",
        start_date: open_vacancy,
        end_date: close_vacancy,
        description: description,
    };

    return await createProgramRepo(newProgramDataMapper);
};
