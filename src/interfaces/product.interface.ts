import { Document } from "mongoose";

export interface ProductInterface extends Document {
    product_id: string,
    name: string,
    price: number,
    size: string
}