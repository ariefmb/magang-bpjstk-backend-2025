import { Router } from "express";
import { HealthRouter } from "./health.route";
import { ProductRouter } from "./product.route";
import { AuthRouter } from "./auth.route";

export const routes: Router = Router();

const _routes: Array<[string, Router]> = [
    ["/", HealthRouter],
    ["/product", ProductRouter],
    ["/auth", AuthRouter],
];

_routes.forEach((route) => {
    const [url, router] = route;
    routes.use(url, router);
});
