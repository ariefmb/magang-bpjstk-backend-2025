import { UserInterface } from "../interfaces/user.interface";
import userModel from "../models/user.model";

export const createUserRepo = async (payload: UserInterface) => {
    return await userModel.create(payload);
};

export const findUserByEmail = async (email: string) => {
    return await userModel.findOne({ email: email });
};
