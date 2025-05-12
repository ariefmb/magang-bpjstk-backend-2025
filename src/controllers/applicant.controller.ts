import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import {
    addApplicantRepo,
    uploadAndDelete,
} from "../services/applicant.service";
import { findUserByEmail } from "../services/auth.service";
import logger from "../utils/logger";
import { addApplicantValidation } from "../validations/applicant.validation";

export const addApplicantController = async (req: Request, res: Response) => {
    req.body.applicant_id = uuidv4();
    const { error, value } = addApplicantValidation(req.body);

    if (error) {
        logger.info(`ERR: applicant - add = ${error.details[0].message}`);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error.details[0].message,
        });
    } else {
        try {
            const user = res.locals.user;
            const userApplicant = await findUserByEmail(value.email);

            if (user._doc.email !== userApplicant?.email) {
                logger.info("ERR: applicant - add = user email does not valid");
                res.status(422).send({
                    status: false,
                    statusCode: 422,
                    message: "user email does not valid",
                });
            } else {
                const files = req.files as {
                    [fieldname: string]: Express.Multer.File[];
                };

                const applicantDataMapper = {
                    ...value,
                    photo: await uploadAndDelete(files.photo[0], [
                        "jpg",
                        "jpeg",
                        "png",
                    ]),
                    suratPengantar: await uploadAndDelete(files.suratPengantar[0], [
                        "pdf",
                        "docx",
                    ]),
                    cv: await uploadAndDelete(files.cv[0], ["pdf", "docx"]),
                    portfolio: await uploadAndDelete(files.portfolio[0], [
                        "pdf",
                        "docx",
                    ]),
                };

                console.log(
                    `applicant data: ${JSON.stringify(applicantDataMapper)}`
                );

                await addApplicantRepo(applicantDataMapper);
                logger.info("Success add new applicant");
                res.status(201).send({
                    status: true,
                    statusCode: 201,
                    message: "Success add new applicant",
                    data: value,
                });
            }
        } catch (error) {
            logger.info(`ERR: applicant - add = ${error}`);
            res.status(422).send({
                status: false,
                statusCode: 422,
                message: error,
            });
        }
    }
};
