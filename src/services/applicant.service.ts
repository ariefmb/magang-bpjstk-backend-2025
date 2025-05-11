import { ApplicantInterface } from "../interfaces/applicant.interface";
import applicantModel from "../models/applicant.model";

export const addApplicantRepo = async (payload: ApplicantInterface) => {
    return await applicantModel.create(payload);
};
