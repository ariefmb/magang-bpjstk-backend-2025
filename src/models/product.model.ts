import mongoose from "mongoose";
import { ProductInterface } from "../interfaces/product.interface";

const productSchema = new mongoose.Schema<ProductInterface>(
    {
        product_id: {
            type: String,
            unique: true,
        },
        name: {
            type: String,
        },
        price: {
            type: Number,
        },
        size: {
            type: String,
        },
    },
    { timestamps: true }
);

const productModel = mongoose.model("product", productSchema);

export default productModel;
