import { Router } from "express";
import {
    addProductController,
    getAllProductsController,
} from "../controllers/product.controller";

export const ProductRouter: Router = Router();

ProductRouter.get("/", getAllProductsController);
ProductRouter.post("/", addProductController);
