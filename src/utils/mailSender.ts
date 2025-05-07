import nodemailer from "nodemailer";
import { EmailDetailsInterface } from "../interfaces/otp.interface";
import CONFIG from "../config/environment";
import logger from "./logger";

const mailSender = async (email: string, title: string, body: string) => {
    try {
        const transporter = nodemailer.createTransport({
            host: CONFIG.mail_host,
            auth: {
                user: CONFIG.mail_user,
                pass: CONFIG.mail_pass,
            },
        });

        await transporter.sendMail({
            from: `Magang BPJSTK ${CONFIG.mail_user}`,
            to: email,
            subject: title,
            html: body,
        });
    } catch (error) {
        logger.error(error);
    }
};

export const sendEmailVerification = async (
    emailDetails: EmailDetailsInterface
) => {
    try {
        const { email, subject, body } = emailDetails;
        await mailSender(email, subject, body);

        logger.info(`Email sent successfully`);
    } catch (error) {
        logger.error(`Error sending email: ${error}`);
    }
};
