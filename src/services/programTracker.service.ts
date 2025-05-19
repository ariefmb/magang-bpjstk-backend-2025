import { programTrackerInterface } from "../interfaces/programTracker.interface";
import programTrackerModel from "../models/programTracker.model";

export const createProgramRepo = async (payload: programTrackerInterface) => {
    return await programTrackerModel.create(payload);
};

export const getAllProgramTrackersRepo = async () => {
    return await programTrackerModel.find();
};

export const getProgramTrackerByIdRepo = async (id: string) => {
    return await programTrackerModel.findOne({ programTracker_id: id });
};

export const updateProgramRepo = async (id: string, payload: programTrackerInterface) => {
    return await programTrackerModel.findOneAndUpdate({ programTracker_id: id }, { $set: payload });
};

export const deleteProgramTrackerRepo = async (id: string) => {
    return await programTrackerModel.findOneAndDelete({ programTracker_id: id });
};
