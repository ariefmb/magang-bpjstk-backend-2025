import mongoose from "mongoose";
import CONFIG from "../config/environment";
import logger from "./logger";

mongoose
    .connect(`${CONFIG.db}`)
    .then(() => {
        logger.info("Connected to MongoDB 🚀");
    })
    .catch((error) => {
        logger.info("Could not connect to MongoDB ❌");
        logger.error(error);
        process.exit(1);
    });
