import nodemailer from "nodemailer";
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

export const sendVerificationEmail = async (email: string, otp: string) => {
    try {
        await mailSender(
            email,
            "Verification Email",
            `<h2>Please confirm your OTP</h2>
            <p>Here is your OTP code: <span style="color:tomato; font-size:25px; letter-spacing:2px;"><b>${otp}</b></span></p>
            <p>This code <b>expires in 5 minutes</b>. Please confirm your OTP on this link below.</p>
            <a href="https://mail.google.com">Verify your OTP</a>`
        );

        logger.info(`Email sent successfully`);
    } catch (error) {
        logger.error(`Error sending email: ${error}`);
    }
};
