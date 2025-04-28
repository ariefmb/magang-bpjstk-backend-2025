import { Router } from "express";
import {
    addProductController,
    deleteProductByIdController,
    getProductsController,
    updateProductByIdController,
} from "../controllers/product.controller";
import { requireAdmin, requireUser } from "../middleware/auth";

export const ProductRouter: Router = Router();

ProductRouter.post("/", requireUser, addProductController);
ProductRouter.get("/", requireAdmin, getProductsController);
ProductRouter.get("/:product_id", getProductsController);
ProductRouter.put("/:product_id", updateProductByIdController);
ProductRouter.delete("/:product_id", deleteProductByIdController);
