import otpgenerator from 'otp-generator';
import OTPModel from '../models/otp.model';

export const otpGenerator = async () => {
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

    console.log(`otp: ${otp}`);
    return otp
};
