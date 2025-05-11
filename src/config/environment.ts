import "dotenv/config";
import logger from "../utils/logger";

const CONFIG = {
    db: process.env.MONGO_DB_URI,
    jwt_private_key: process.env.JWT_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    jwt_public_key: process.env.JWT_PUBLIC_KEY!.replace(/\\n/g, "\n"),
    mail_host: process.env.MAIL_HOST,
    mail_user: process.env.MAIL_USER,
    mail_pass: process.env.MAIL_PASS,
    google_drive_scopes: process.env.GOOGLE_DRIVE_SCOPES,
};

if (!CONFIG.db) {
    logger.error("Missing environment variable: MONGO_DB_URI");
    process.exit(1);
}
if (!CONFIG.jwt_private_key) {
    logger.error("Missing environment variable: JWT_PRIVATE_KEY");
    process.exit(1);
}
if (!CONFIG.jwt_public_key) {
    logger.error("Missing environment variable: JWT_PUBLIC_KEY");
    process.exit(1);
}
if (!CONFIG.mail_user || !CONFIG.mail_pass || !CONFIG.mail_host) {
    logger.error(
        "Missing environment variables: MAIL_HOST, MAIL_USER, or MAIL_PASS"
    );
    process.exit(1);
}
if (!CONFIG.google_drive_scopes) {
    logger.error("Missing environment variables: GOOGLE_DRIVE_SCOPES");
    process.exit(1);
}

export default CONFIG;
