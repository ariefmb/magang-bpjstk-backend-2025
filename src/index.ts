import cors from "cors";
import express, { Express, NextFunction, Request, Response } from "express";
import { routes } from "./routes";
import logger from "./utils/logger";

// connecting to MongoDB
import "./utils/connectDB";

import deserializeToken from "./middleware/deserializedToken";

const app: Express = express();
const port = 4000;

// parse body request
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// cors access handler
app.use(cors());
app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
});

app.use(deserializeToken);

app.use("/", routes);

try {
    app.listen(port, () => logger.info(`Server is listening on port ${port}`));
} catch (error) {
    logger.error(error);
}
