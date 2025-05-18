import Joi from "joi";
import { programTrackerInterface } from "../../interfaces/programTracker.interface";

export const updateOfferingValidation = (payload: programTrackerInterface) => {
    const Schema = Joi.object({
        unit: Joi.string().trim(),
        mentor_name: Joi.string().trim(),
        contact: Joi.string(),
        working_model: Joi.string().valid("Work At Office", "work at office", "Work From Home", "work from home"),
        city: Joi.string(),
        location: Joi.string(),
        journey: Joi.string().valid(
            "Administration",
            "Interview",
            "Offering",
            "Confirmation",
            "Working Experience",
            "Graduation"
        ),
        start_date: Joi.date(),
        end_date: Joi.date(),
        onBoarding_date: Joi.date().required(),
    });

    return Schema.validate(payload);
};
