import otpgenerator from "otp-generator";
import OTPModel from "../models/otp.model";
import logger from "./logger";

export const otpGenerator = async () => {
    try {
        let otp = otpgenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        let result = await OTPModel.findOne({ otp: otp });

        while (result) {
            otp = otpgenerator.generate(6, {
                upperCaseAlphabets: false,
            });
            result = await OTPModel.findOne({ otp: otp });
        }

        return otp;
    } catch (error) {
        logger.error("Error generating OTP:", error);
    }
};
