import { hashing } from "../utils/hashing";
import { UserInterface } from "../interfaces/user.interface";
import userModel from "../models/user.model";

export const createUserRepo = async (payload: UserInterface) => {
    return await userModel.create(payload);
};

export const findUserRepo = async () => {
    return await userModel.find();
};

export const findUserById = async (id: string) => {
    return await userModel.findOne({ user_id: id });
};

export const findUserByEmail = async (email: string) => {
    return await userModel.findOne({ email: email });
};

export const updateUserByIdRepo = async (
    id: string,
    payload: UserInterface
) => {
    return await userModel.findOneAndUpdate({ user_id: id }, { $set: payload });
};

export const deleteUserByIdRepo = async (id: string) => {
    return await userModel.findOneAndDelete({ user_id: id });
};
