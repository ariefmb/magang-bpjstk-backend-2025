import { programTrackerInterface } from "../interfaces/programTracker.interface";
import programTrackerModel from "../models/programTracker.model";

export const createAdministration = async (payload: programTrackerInterface) => {
    return await programTrackerModel.create(payload);
};

export const getAllProgramTrackersRepo = async () => {
    return await programTrackerModel.find();
};

export const updateAdministration = async (id: string, payload: programTrackerInterface) => {
    return await programTrackerModel.findOneAndUpdate({ programTracker_id: id }, { $set: payload });
};

export const deleteProgramTrackerRepo = async (id: string) => {
    return await programTrackerModel.findOneAndDelete({ programTracker_id: id });
};
