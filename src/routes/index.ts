import { Router } from "express";
import { AuthRouter } from "./auth.route";
import { HealthRouter } from "./health.route";
import { OTPRouter } from "./otp.route";
import { ProductRouter } from "./product.route";
import { VacancyRouter } from "./vacancy.route";

export const routes: Router = Router();

const _routes: Array<[string, Router]> = [
    ["/", HealthRouter],
    ["/product", ProductRouter],
    ["/auth", AuthRouter],
    ["/otp", OTPRouter],
    ["/vacancy", VacancyRouter],
];

_routes.forEach((route) => {
    const [url, router] = route;
    routes.use(url, router);
});
