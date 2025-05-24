import { ApplicantInterface } from "../interfaces/applicant.interface";
import applicantModel from "../models/applicant.model";

export const addApplicantRepo = async (payload: ApplicantInterface) => {
    return await applicantModel.create(payload);
};

export const getApplicantsRepo = async () => {
    return await applicantModel.find();
};

export const getApplicantByIdRepo = async (id: string) => {
    return await applicantModel.findOne({ applicant_id: id });
};

export const getManyApplicantsByIdVacancy = async (id: string) => {
    return await applicantModel.find({ program_id: id });
};

export const searchApplicantsRepo = async (name: string) => {
    return await applicantModel.find({
        name: { $regex: name, $options: "i" },
    });
};

export const updateApplicantRepo = async (id: string, payload: ApplicantInterface) => {
    return await applicantModel.findOneAndUpdate({ applicant_id: id }, { $set: payload });
};

export const deleteApplicantRepo = async (id: string) => {
    return await applicantModel.findOneAndDelete({ applicant_id: id });
};

export const getApplicantsByEmailRepo = async (email: string) => {
    return await applicantModel.find({ email: { $regex: email } });
};

export const getApplicantsToDeleted = async (id: string) => {
    return await applicantModel.find({ program_id: { $regex: id } });
};
