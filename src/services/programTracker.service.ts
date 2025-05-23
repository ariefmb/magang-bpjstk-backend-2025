import cron from "node-cron";
import { programTrackerInterface } from "../interfaces/programTracker.interface";
import reportMenteeModel from "../models/journey models/reportMentee.model";
import programTrackerModel from "../models/programTracker.model";
import logger from "../utils/logger";

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

cron.schedule("0 0 * * *", async () => {
    const now = new Date();
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    if (now > endOfMonth) {
        try {
            const result = await reportMenteeModel.updateMany({ status: "Waiting" }, { $set: { status: "Overdue" } });

            logger.info(`[CRON] updated ${result.modifiedCount} report(s) to "Overdue".`);
        } catch (error) {
            logger.info(`[CRON ERROR] Failed to update status to Overdue ${error}`);
        }
    }
});
