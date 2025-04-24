import "dotenv/config";
import logger from "../utils/logger";

const CONFIG = {
    db: process.env.MONGO_DB_URI,
};

if (!CONFIG.db) {
    logger.error("Missing environment variable: MONGO_DB_URI");
    process.exit(1)
}

export default CONFIG;
