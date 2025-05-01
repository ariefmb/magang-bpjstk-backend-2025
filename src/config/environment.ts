import "dotenv/config";
import logger from "../utils/logger";

const CONFIG = {
    db: process.env.MONGO_DB_URI,
    jwt_private_key: process.env.JWT_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    jwt_public_key: process.env.JWT_PUBLIC_KEY!.replace(/\\n/g, '\n'),
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

export default CONFIG;
