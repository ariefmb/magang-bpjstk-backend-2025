import { requestProgramInterface } from "../interfaces/requestProgram.interface";
import reqProgramModel from "../models/requestProgram.model";

export const requestProgramRepo = async (payload: requestProgramInterface) => {
    return await reqProgramModel.create(payload);
};

export const getReqProgramsRepo = async () => {
    return await reqProgramModel.find();
};

export const searchReqProgramRepo = async (title: string) => {
    return await reqProgramModel.find({
        title: { $regex: title, $options: "i" },
    });
};

export const getReqProgramByIdRepo = async (id: string) => {
    return await reqProgramModel.findOne({ reqProgram_id: id });
};

export const updateReqProgramRepo = async (id: string, payload: requestProgramInterface) => {
    return await reqProgramModel.findOneAndUpdate({ reqProgram_id: id }, { $set: payload });
};

export const deleteReqProgramRepo = async (id: string) => {
    return await reqProgramModel.findOneAndDelete({ reqProgram_id: id });
};
