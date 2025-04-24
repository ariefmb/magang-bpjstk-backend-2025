import productModel from "../models/product.model";
import logger from "../utils/logger";

export const getProductRepo = async () => {
    return await productModel
        .find()
        .then((data) => {
            return data;
        })
        .catch((error) => {
            logger.info("Cannot fetch all data products");
            logger.error(error);
        });
};
