import { requestVacancyInterface } from "../interfaces/requestVacancy.interface";
import reqVacancyModel from "../models/requestVacancy.model";

export const requestVacancyRepo = async (payload: requestVacancyInterface) => {
    return await reqVacancyModel.create(payload);
};

export const getReqVacanciesRepo = async () => {
    return await reqVacancyModel.find();
};

export const searchReqVacancyRepo = async (title: string) => {
    return await reqVacancyModel.find({
        title: { $regex: title, $options: "i" },
    });
};

export const getReqVacancyByIdRepo = async (id: string) => {
    return await reqVacancyModel.findOne({ reqVacancy_id: id });
};

export const updateReqVacancyRepo = async (
    id: string,
    payload: requestVacancyInterface
) => {
    return await reqVacancyModel.findOneAndUpdate(
        { reqVacancy_id: id },
        { $set: payload }
    );
};

export const deleteReqVacancyRepo = async (id: string) => {
    return await reqVacancyModel.findOneAndDelete({ reqVacancy_id: id });
};
