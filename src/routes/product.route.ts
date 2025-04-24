import { Router } from "express";
import {
    addProductController,
    getProductsController,
} from "../controllers/product.controller";

export const ProductRouter: Router = Router();

ProductRouter.get("/", getProductsController);
ProductRouter.get("/:name", getProductsController);
ProductRouter.post("/", addProductController);
