import { Router } from "express";
import { ApplicantRouter } from "./applicant.route";
import { AuthRouter } from "./auth.route";
import { HealthRouter } from "./health.route";
import { OTPRouter } from "./otp.route";
import { ReqVacancyRoute } from "./requestVacancy.route";
import { VacancyRouter } from "./vacancy.route";
import { ProgramTrackerRouter } from "./programTracker.route";

export const routes: Router = Router();

const _routes: Array<[string, Router]> = [
    ["/", HealthRouter],
    ["/auth", AuthRouter],
    ["/otp", OTPRouter],
    ["/vacancy", VacancyRouter],
    ["/request/vacancy", ReqVacancyRoute],
    ["/applicant", ApplicantRouter],
    ["/program_tracker", ProgramTrackerRouter],
];

_routes.forEach((route) => {
    const [url, router] = route;
    routes.use(url, router);
});
