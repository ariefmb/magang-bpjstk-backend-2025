import { v4 as uuidv4 } from "uuid";
import { hashing } from "../utils/hashing";
import { sendEmailVerification } from "../utils/mailSender";
import { otpGenerator } from "../utils/otpGenerator";
import { sendOTPValidation } from "../validations/otp.validation";
import { createOTPRepo, findMatchOTP } from "./otp.service";

export const sendEmailVerificationService = async (
    email: string,
    createdAt = new Date()
) => {
    const checkUser = await findMatchOTP(email);

    if (checkUser) {
        throw new Error("Email already registered");
    } else {
        const otp_id = uuidv4();
        const otp = await otpGenerator();

        if (otp) {
            const otpPayload = { otp_id, email, otp, createdAt };

            const { error, value } = sendOTPValidation(otpPayload);

            if (error)
                throw new Error(
                    `ERR: OTP - send = ${error.details[0].message}`
                );

            const emailDetails = {
                email,
                subject: "Verification Email",
                body: `<h2>Please confirm your OTP</h2>
                <p>Here is your OTP code: <span style="color:tomato; font-size:25px; letter-spacing:2px;"><b>${otp}</b></span></p>
                <p>This code <b>expires in 5 minutes</b>. Please confirm your OTP on this link below.</p>
                <a href="https://mail.google.com">Verify your OTP</a>`,
            };

            await sendEmailVerification(emailDetails);

            value.otp = hashing(value.otp);
            await createOTPRepo(value);

            return value;
        } else {
            throw new Error("OTP Failed to generate");
        }
    }
};

export const sendEmailForgotPasswordService = async (
    email: string,
    createdAt = new Date()
) => {
    const checkUser = await findMatchOTP(email);

    if (checkUser) {
        throw new Error("Email already registered");
    } else {
        const otp_id = uuidv4();
        const otp = await otpGenerator();

        if (otp) {
            const otpPayload = { otp_id, email, otp, createdAt };

            const { error, value } = sendOTPValidation(otpPayload);

            if (error)
                throw new Error(
                    `ERR: OTP - send = ${error.details[0].message}`
                );

            const emailDetails = {
                email,
                subject: "Password Reset",
                body: `<h2>Enter the below OTP code to reset your password</h2>
                <p>Here is your OTP code: <span style="color:tomato; font-size:25px; letter-spacing:2px;"><b>${otp}</b></span></p>
                <p>This code <b>expires in 5 minutes</b>. Please confirm your OTP on this link below.</p>
                <a href="https://mail.google.com">Verify your OTP</a>`,
            };

            await sendEmailVerification(emailDetails);

            value.otp = hashing(value.otp);
            await createOTPRepo(value);

            return value;
        } else {
            throw new Error("OTP Failed to generate");
        }
    }
};
