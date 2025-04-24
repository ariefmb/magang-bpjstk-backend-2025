import { Request, Response } from "express";
import logger from "../utils/logger";
import { createProductValidation } from "../validations/product.validation";

export const getAllProductsController = async (req: Request, res: Response) => {
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
};

export const addProductController = async (req: Request, res: Response) => {
    const { error, value } = createProductValidation(req.body);
    if (error) {
        logger.error(`ERR: product - create = ${error.details[0].message}`);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error.details[0].message,
            data: {},
        });
    } else {
        logger.info("Success add new product data");
        res.status(200).send({
            status: true,
            statusCode: 200,
            message: "Add product success",
            data: value,
        });
    }
};
