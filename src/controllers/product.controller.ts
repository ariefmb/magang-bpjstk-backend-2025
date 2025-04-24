import { Request, Response } from "express";
import logger from "../utils/logger";
import { createProductValidation } from "../validations/product.validation";

export const getProductsController = async (req: Request, res: Response) => {
    const products = [
        {
            name: "Sepatu",
            price: 500000,
        },
        {
            name: "Kaos",
            price: 300000,
        },
    ];

    const {
        params: { name },
    } = req;

    if (name) {
        const filteredProduct = products.filter((product) => {
            if (product.name === name) {
                return product;
            }
        });
        if (filteredProduct.length === 0) {
            logger.info("Product not found!");
            res.status(404).send({
                status: false,
                statusCode: 404,
                message: "Product not found!",
                data: {},
            });
        } else {
            logger.info("Success get product");
            res.status(200).send({
                status: true,
                statusCode: 200,
                message: "Success get product",
                data: filteredProduct[0],
            });
        }
    } else {
        logger.info("Success get all products");
        res.status(200).send({
            status: true,
            statusCode: 200,
            data: products,
        });
    }
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
