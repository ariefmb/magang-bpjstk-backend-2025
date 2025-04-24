import { Router } from "express";
import { HealthRouter } from "./health.route";
import { ProductRouter } from "./product.route";

export const routes: Router = Router();

const _routes: Array<[string, Router]> = [
    ["/health", HealthRouter],
    ["/product", ProductRouter],
];

_routes.forEach((route) => {
    const [url, router] = route;
    routes.use(url, router);
});
