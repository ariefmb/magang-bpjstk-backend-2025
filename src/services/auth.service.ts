import { UserInterface } from "../interfaces/user.interface";
import userModel from "../models/user.model";

export const createUserRepo = async (payload: UserInterface) => {
    return await userModel.create(payload);
};

export const findUserRepo = async () => {
    return await userModel.find();
};

export const searchUserRepo = async (name: string) => {
    return await userModel.find({ name: { $regex: name, $options: "i" } });
};

export const findUserById = async (id: string) => {
    return await userModel.findOne({ user_id: id });
};

export const findUserByEmail = async (email: string) => {
    return await userModel.findOne({ email: email });
};

export const getAllMentorsRepo = async () => {
    return await userModel.find({ role: "mentor" });
};

export const findMentorById = async (id: string) => {
    return await userModel.findOne({ role: "mentor", user_id: id });
};

export const searchMentorRepo = async (name: string) => {
    return await userModel.find({ role: "mentor", name: { $regex: name, $options: "i" } });
};

export const getAllMenteesRepo = async () => {
    return await userModel.find({ role: "mentee" });
};

export const findMenteeById = async (id: string) => {
    return await userModel.findOne({ role: "mentee", user_id: id });
};

export const searchMenteeRepo = async (name: string) => {
    return await userModel.find({ role: "mentee", name: { $regex: name, $options: "i" } });
};

export const updateUserByIdRepo = async (id: string, payload: UserInterface) => {
    return await userModel.findOneAndUpdate({ user_id: id }, { $set: payload });
};

export const updateUserByEmailRepo = async (email: string) => {
    return await userModel.findOneAndUpdate({ email: email }, { verified: true });
};

export const resetPasswordRepo = async (email: string, password: string) => {
    return await userModel.findOneAndUpdate({ email: email }, { password: password });
};

export const deleteUserByIdRepo = async (id: string) => {
    return await userModel.findOneAndDelete({ user_id: id });
};
