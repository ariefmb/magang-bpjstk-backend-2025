import nodemailer from "nodemailer";
import CONFIG from "../config/environment";
import logger from "./logger";

export const mailSender = async (
    email: string,
    title: string,
    body: string
) => {
    try {
        const transporter = nodemailer.createTransport({
            host: CONFIG.mail_host,
            auth: {
                user: CONFIG.mail_user,
                pass: CONFIG.mail_pass,
            },
        });

        const info = await transporter.sendMail({
            from: `BPJSTK ${CONFIG.mail_user}`,
            to: email,
            subject: title,
            html: body,
        });

        logger.info(`Email info: ${info}`);
        return info;
    } catch (error) {
        logger.error(error);
    }
};
