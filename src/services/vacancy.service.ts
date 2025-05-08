import { VacancyInterface } from "src/interfaces/vacancy.interface";
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
