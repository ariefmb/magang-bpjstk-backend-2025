import { Router } from "express";
import {
    addProductController,
    deleteProductByIdController,
    getProductsController,
    updateProductByIdController,
} from "../controllers/product.controller";
import { requireAdmin } from "../middleware/auth";

export const ProductRouter: Router = Router();

ProductRouter.post("/", requireAdmin, addProductController);
ProductRouter.get("/", getProductsController);
ProductRouter.get("/:product_id", getProductsController);
// ProductRouter.get("/", requireUser, getProductsController);
// ProductRouter.get("/:product_id", requireUser, getProductsController);
ProductRouter.put("/:product_id", requireAdmin, updateProductByIdController);
ProductRouter.delete("/:product_id", requireAdmin, deleteProductByIdController);
