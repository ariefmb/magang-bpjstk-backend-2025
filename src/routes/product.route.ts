import { Router } from "express";
import {
    addProductController,
    deleteProductByIdController,
    getProductsController,
    updateProductByIdController,
} from "../controllers/product.controller";

export const ProductRouter: Router = Router();

ProductRouter.post("/", addProductController);
ProductRouter.get("/", getProductsController);
ProductRouter.get("/:product_id", getProductsController);
ProductRouter.put("/:product_id", updateProductByIdController);
ProductRouter.delete("/:product_id", deleteProductByIdController);
