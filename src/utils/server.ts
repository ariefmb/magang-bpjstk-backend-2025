import cors from "cors";
import express, { Express, NextFunction, Request, Response } from "express";
import deserializeToken from "../middleware/deserializedToken";
import { routes } from "../routes";

const createServer = () => {
    const app: Express = express();
    app.use(deserializeToken);

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

    app.use("/", routes);

    return app;
};

export default createServer;
