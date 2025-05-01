import { Router } from "express";
import {
    addProductController,
    deleteProductByIdController,
    getProductsController,
    updateProductByIdController,
} from "../controllers/product.controller";
import { requireAdmin, requireUser } from "../middleware/auth";

export const ProductRouter: Router = Router();

ProductRouter.post("/", requireAdmin, addProductController);
ProductRouter.get("/", requireUser, getProductsController);
ProductRouter.get("/:product_id", requireUser, getProductsController);
ProductRouter.put("/:product_id", requireAdmin, updateProductByIdController);
ProductRouter.delete("/:product_id", requireAdmin, deleteProductByIdController);
