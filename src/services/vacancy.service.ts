import { requestVacancyInterface } from "src/interfaces/requestVacancy.interface";
import { v4 as uuidv4 } from "uuid";
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

export const getAndUpdateStatusVacancy = (openDate: Date, closeDate: Date) => {
    const thisTime: Date = new Date();

    if (openDate <= thisTime) {
        return closeDate < thisTime ? "Closed" : "Open";
    }
    return "Pending";
};

export const updateStatusVacancy = async (id?: string) => {
    let statusNow: String = "Pending";

    try {
        if (id) {
            const vacancy = await vacancyModel.findOne({ vacancy_id: id });

            if (vacancy) {
                statusNow = getAndUpdateStatusVacancy(
                    vacancy.open_vacancy,
                    vacancy.close_vacancy
                );

                await vacancyModel.findOneAndUpdate(
                    { vacancy_id: id },
                    { status: statusNow }
                );
            }
        } else {
            const vacancies = await vacancyModel.find();

            for (const vacancy of vacancies) {
                statusNow = getAndUpdateStatusVacancy(
                    vacancy.open_vacancy,
                    vacancy.close_vacancy
                );

                await vacancyModel.findOneAndUpdate(
                    { vacancy_id: vacancy.vacancy_id },
                    { status: statusNow }
                );
            }
        }
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : String(error));
    }
};

export const updateVacancyByIdRepo = async (
    id: string,
    payload: VacancyInterface
) => {
    return await vacancyModel.findOneAndUpdate(
        { vacancy_id: id },
        { $set: payload }
    );
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

export const approvalVacancyRepo = async (
    id: string,
    payload: requestVacancyInterface
) => {
    return await reqVacancyModel.findOneAndUpdate(
        { reqVacancy_id: id },
        { $set: payload }
    );
};

export const createVacancyApprovedRepo = async (
    payload: requestVacancyInterface
) => {
    const {
        title,
        unit,
        mentor_name,
        contact,
        position,
        tw,
        duration,
        working_model,
        open_vacancy,
        close_vacancy,
        description,
        quotaGiven,
    } = payload;

    const newstatus = getAndUpdateStatusVacancy(open_vacancy, close_vacancy);
    const newVacancyId = uuidv4();

    const newVacancyDataMapper: VacancyInterface = {
        vacancy_id: newVacancyId,
        title: title,
        status: newstatus,
        unit: unit,
        mentor_name: mentor_name,
        contact: contact,
        position: position,
        quota: quotaGiven || 1,
        tw: tw,
        duration: duration,
        working_model: working_model,
        open_vacancy: open_vacancy,
        close_vacancy: close_vacancy,
        description: description,
    };

    return await createVacancyRepo(newVacancyDataMapper);
};
