import cron from "node-cron";
import { v4 as uuidv4 } from "uuid";
import { ProgramInterface } from "../interfaces/program.interface";
import { requestProgramInterface } from "../interfaces/requestProgram.interface";
import programModel from "../models/program.model";
import logger from "../utils/logger";
import { getManyApplicantsByIdProgram } from "./applicant.service";
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
    const mentees: any = await getManyApplicantsByIdProgram(program_id);
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
        await programModel.updateMany({ status: "Pending", start_date: { $lte: now } }, { $set: { status: "Open" } });

        logger.info(`[CRON] updated report(s) to "Overdue".`);
    } catch (error) {
        logger.info(`[CRON ERROR] Failed to update status to Overdue ${error}`);
    }
});

export const getStatusProgram = (openDate: Date) => {
    const thisTime: Date = new Date();
    return openDate > thisTime ? "Pending" : "Active";
};

export const createProgramApprovedRepo = async (payload: requestProgramInterface, quotaGiven: number) => {
    const {
        reqProgram_id,
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
        start_date,
        end_date,
        description,
    } = payload;

    const newStatus = getStatusProgram(start_date);

    const newProgramDataMapper: ProgramInterface = {
        program_id: reqProgram_id,
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
        start_date: start_date,
        end_date: end_date,
        description: description,
    };

    return await createProgramRepo(newProgramDataMapper);
};
