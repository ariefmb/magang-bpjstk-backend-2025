import cron from "node-cron";
import logger from "../utils/logger";
import { v4 as uuidv4 } from "uuid";
import { requestVacancyInterface } from "../interfaces/requestVacancy.interface";
import { VacancyInterface } from "../interfaces/vacancy.interface";
import reqVacancyModel from "../models/requestVacancy.model";
import vacancyModel from "../models/vacancy.model";

export const createVacancyRepo = async (payload: VacancyInterface) => {
    return await vacancyModel.create(payload);
};

export const getVacanciesRepo = async () => {
    return await vacancyModel.find();
};

export const getVacancyByIdRepo = async (id: string) => {
    return await vacancyModel.findOne({ vacancy_id: id });
};

cron.schedule("0 0 * * *", async () => {
    const now = new Date();

    try {
        await vacancyModel.updateMany({ status: "Pending", open_vacancy: { $lte: now } }, { $set: { status: "Open" } });
        await vacancyModel.updateMany({ status: "Open", close_vacanncy: { $lt: now } }, { $set: { status: "Closed" } });

        logger.info(`[CRON] updated report(s) to "Overdue".`);
    } catch (error) {
        logger.info(`[CRON ERROR] Failed to update status to Overdue ${error}`);
    }
});

export const updateVacancyByIdRepo = async (id: string, payload: VacancyInterface) => {
    return await vacancyModel.findOneAndUpdate({ vacancy_id: id }, { $set: payload });
};

export const deleteVacancyByIdRepo = async (id: string) => {
    return await vacancyModel.findOneAndDelete({ vacancy_id: id });
};

export const searchVacancyRepo = async (title: string) => {
    return await vacancyModel.find({ title: { $regex: title, $options: "i" } });
};

export const calculateQuarter = (date: Date) => {
    const month = date.getMonth();
    return Math.ceil(month / 3);
};

export const getStatusVacancy = (openDate: Date, closeDate: Date) => {
    const thisTime: Date = new Date();

    if (openDate <= thisTime) {
        return closeDate < thisTime ? "Closed" : "Open";
    }
    return "Pending";
};

export const createVacancyApprovedRepo = async (payload: requestVacancyInterface, quotaGiven: number) => {
    const {
        reqVacancy_id,
        title,
        unit,
        mentor_name,
        contact,
        position,
        tw,
        duration,
        city,
        working_model,
        open_vacancy,
        close_vacancy,
        description,
    } = payload;

    const newStatus = getStatusVacancy(open_vacancy, close_vacancy);

    const newVacancyDataMapper: VacancyInterface = {
        vacancy_id: reqVacancy_id,
        title: title,
        status: newStatus,
        unit: unit,
        mentor_name: mentor_name,
        contact: contact,
        position: position,
        quota: quotaGiven,
        tw: tw,
        duration: duration,
        city: city,
        working_model: working_model,
        open_vacancy: open_vacancy,
        close_vacancy: close_vacancy,
        description: description,
    };

    return await createVacancyRepo(newVacancyDataMapper);
};
