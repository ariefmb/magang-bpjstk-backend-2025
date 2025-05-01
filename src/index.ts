import logger from "./utils/logger";
import createServer from "./utils/server";

// connecting to MongoDB
import "./utils/connectDB";

const app = createServer();
const port = 4000;

try {
    app.listen(port, () => logger.info(`Server is listening on port ${port}`));
} catch (error) {
    logger.error(error);
}
