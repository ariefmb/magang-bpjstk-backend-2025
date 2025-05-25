import { requestProgramInterface } from "../interfaces/requestProgram.interface";
import reqProgramModel from "../models/requestProgram.model";

export const requestProgramRepo = async (payload: requestProgramInterface) => {
    return await reqProgramModel.create(payload);
};

export const getAllReqProgramsByMentorRepo = async (email: string) => {
    return await reqProgramModel.find({ mentor_email: email });
};

export const searchReqProgramByMentorRepo = async (email: string, title: string) => {
    return await reqProgramModel.find({
        mentor_email: email,
        title: { $regex: title, $options: "i" },
    });
};

export const getAllReqProgramsRepo = async () => {
    return await reqProgramModel.find();
};

export const searchReqProgramRepo = async (title: string) => {
    return await reqProgramModel.find({ title: { $regex: title, $options: "i" } });
};

export const getReqProgramByIdandMentorRepo = async (email: string, id: string) => {
    return await reqProgramModel.findOne({
        mentor_email: email,
        reqProgram_id: id,
    });
};

export const getReqProgramByIdRepo = async (id: string) => {
    return await reqProgramModel.findOne({ reqProgram_id: id });
};

export const updateReqProgramByMentorRepo = async (email: string, id: string, payload: requestProgramInterface) => {
    return await reqProgramModel.findOneAndUpdate({ mentor_email: email, reqProgram_id: id }, { $set: payload });
};

export const updateReqProgramRepo = async (id: string, payload: requestProgramInterface) => {
    return await reqProgramModel.findOneAndUpdate({ reqProgram_id: id }, { $set: payload });
};

export const deleteReqProgramByMentorRepo = async (email: string, id: string) => {
    return await reqProgramModel.findOneAndDelete({ mentor_email: email, reqProgram_id: id });
};

export const deleteReqProgramRepo = async (id: string) => {
    return await reqProgramModel.findOneAndDelete({ reqProgram_id: id });
};
