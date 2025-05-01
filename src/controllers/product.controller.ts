import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import {
    addProductRepo,
    deleteProductByIdRepo,
    getProductByIdRepo,
    getProductRepo,
    updateProductByIdRepo,
} from "../services/product.service";
import logger from "../utils/logger";
import {
    createProductValidation,
    updateProductValidation,
} from "../validations/product.validation";

export const addProductController = async (req: Request, res: Response) => {
    req.body.product_id = uuidv4();
    const { error, value } = createProductValidation(req.body);

    if (error) {
        logger.error(`ERR: product - create = ${error.details[0].message}`);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error.details[0].message,
        });
    } else {
        try {
            await addProductRepo(value);
            logger.info("Success add new product data");
            res.status(201).send({
                status: true,
                statusCode: 201,
                message: "Add product success",
            });
        } catch (error) {
            logger.error(`ERR: product - create = ${error}`);
            res.status(422).send({
                status: false,
                statusCode: 422,
                message: error,
            });
        }
    }
};

export const getProductsController = async (req: Request, res: Response) => {
    const {
        params: { product_id },
    } = req;

    if (product_id) {
        const product = await getProductByIdRepo(product_id);
        if (product) {
            logger.info("Success get product");
            res.status(200).send({
                status: true,
                statusCode: 200,
                message: "Success get product",
                data: product,
            });
        } else {
            logger.info("Product not found!");
            res.status(404).send({
                status: false,
                statusCode: 404,
                message: "Product not found!",
                data: {},
            });
        }
    } else {
        const products: any = await getProductRepo();
        if (products) {
            logger.info("Success get all products");
            res.status(200).send({
                status: true,
                statusCode: 200,
                message: "Success get all products",
                data: products,
            });
        } else {
            logger.info("Internal server error");
            res.status(500).send({
                status: false,
                statusCode: 500,
                message: "Internal server error",
                data: [],
            });
        }
    }
};

export const updateProductByIdController = async (
    req: Request,
    res: Response
) => {
    const {
        params: { product_id },
    } = req;
    const { error, value } = updateProductValidation(req.body);

    if (error) {
        logger.error(`ERR: product - update = ${error.details[0].message}`);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error.details[0].message,
        });
    } else {
        try {
            const updateData = await updateProductByIdRepo(product_id, value);
            if (updateData) {
                logger.info("Success update product data");
                res.status(200).send({
                    status: true,
                    statusCode: 200,
                    message: "Success update product data",
                });
            } else {
                logger.info("Product not found!");
                res.status(404).send({
                    status: false,
                    statusCode: 404,
                    message: "Product not found!",
                });
            }
        } catch (error) {
            logger.error(`ERR: product - update = ${error}`);
            res.status(422).send({
                status: false,
                statusCode: 422,
                message: error,
            });
        }
    }
};

export const deleteProductByIdController = async (
    req: Request,
    res: Response
) => {
    const {
        params: { product_id },
    } = req;

    try {
        const deletedData = await deleteProductByIdRepo(product_id);
        if (deletedData) {
            logger.info("Success delete product data");
            res.status(200).send({
                status: true,
                statusCode: 200,
                message: "Success delete product data",
            });
        } else {
            logger.info("Product not found!");
            res.status(404).send({
                status: false,
                statusCode: 404,
                message: "Product not found!",
            });
        }
    } catch (error) {
        logger.error(`ERR: product - delete = ${error}`);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error,
        });
    }
};
