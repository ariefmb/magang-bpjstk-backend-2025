import { Router } from "express";
import { DevRouter } from "../dev/routes/dev.route";
import { ApplicantRouter } from "./applicant.route";
import { AuthRouter } from "./auth.route";
import { HealthRouter } from "./health.route";
import { CertificateMenteeRouter } from "./journey routes/certificateMentee.route";
import { ReportMenteeRouter } from "./journey routes/reportMentee.route";
import { ZoomAssignRouter } from "./journey routes/zoomAssign.route";
import { OTPRouter } from "./otp.route";
import { ProgramRouter } from "./program.route";
import { ProgramTrackerRouter } from "./programTracker.route";
import { ReqVacancyRoute } from "./requestVacancy.route";
import { VacancyRouter } from "./vacancy.route";

export const routes: Router = Router();

const _routes: Array<[string, Router]> = [
    ["/", HealthRouter],
    ["/auth", AuthRouter],
    ["/otp", OTPRouter],
    ["/program", ProgramRouter],
    ["/vacancy", VacancyRouter],
    ["/request/vacancy", ReqVacancyRoute],
    ["/applicant", ApplicantRouter],
    ["/program_tracker", ProgramTrackerRouter],
    ["/journey/assign_zoom", ZoomAssignRouter],
    ["/journey/report_mentee", ReportMenteeRouter],
    ["/journey/certificate_mentee", CertificateMenteeRouter],
    ["/dev", DevRouter],
];

_routes.forEach((route) => {
    const [url, router] = route;
    routes.use(url, router);
});
