import { Request, Response, Router } from "express";
import logger from "../utils/logger";

export const HealthRouter: Router = Router();

HealthRouter.get("/", (req: Request, res: Response) => {
    logger.info("Health check success");
    res.status(200).send({
        status: true,
        statusCode: 200,
        data: "Hello World",
    });
});
