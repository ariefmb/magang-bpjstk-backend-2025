import mongoose from "mongoose";
import logger from "src/utils/logger";
import { mailSender } from "src/utils/mailSender";

const OTPSchema = new mongoose.Schema({
    otp_id: { type: String, required: true, unique: true },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 60 * 5 },
});

const sendVerificationEmail = async (email: string, otp: string) => {
    try {
        const mailResponse = await mailSender(
            email,
            "Verification Email",
            `<h1>Please confirm your OTP</h1>
            <p>Here is your OTP code: ${otp}</p>`
        );

        logger.info(`Email sent successfully: ${mailResponse}`);
    } catch (error) {
        logger.error(`Error sending email: ${error}`);
    }
};

OTPSchema.pre("save", async function (next) {
    logger.info("New document saved to the database");

    if (this.isNew) {
        await sendVerificationEmail(this.email, this.otp);
    }
    next();
});

const OTPModel = mongoose.model("OTP", OTPSchema);

export default OTPModel;
