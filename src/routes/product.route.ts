import { Request, Response, Router } from "express";
import logger from "../utils/logger";

export const ProductRouter: Router = Router();

ProductRouter.get("/", (req: Request, res: Response) => {
    const dataProduct = [
        {
            name: "Sepatu",
            price: 500000,
        },
    ];

    logger.info("Fetched product success");
    res.status(200).send({
        status: true,
        statusCode: 200,
        data: dataProduct,
    });
});
