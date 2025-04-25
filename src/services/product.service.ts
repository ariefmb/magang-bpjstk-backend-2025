import { ProductInterface } from "../interfaces/product.interface";
import productModel from "../models/product.model";

export const addProductRepo = async (payload: ProductInterface) => {
    return await productModel.create(payload);
};

export const getProductRepo = async () => {
    return await productModel.find();
};

export const getProductByIdRepo = async (id: string) => {
    return await productModel.findOne({ product_id: id });
};

export const updateProductByIdRepo = async (
    id: string,
    payload: ProductInterface
) => {
    return await productModel.findOneAndUpdate(
        { product_id: id },
        { $set: payload }
    );
};

export const deleteProductByIdRepo = async (id: string) => {
    return await productModel.findOneAndDelete({ product_id: id });
};
