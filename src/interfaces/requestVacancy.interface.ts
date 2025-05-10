export interface requestVacancyInterface {
    reqVacancy_id: string;
    title: string;
    status:
        | "Approved"
        | "approved"
        | "Rejected"
        | "rejected"
        | "Waiting"
        | "waiting";
    unit: string;
    mentor_name: string;
    contact: string;
    position: string;
    quota: number;
    duration: number;
    working_model:
        | "Work At Office"
        | "work at office"
        | "Work From Home"
        | "work from home";
    open_vacancy: Date;
    close_vacancy: Date;
    description?: string | "";
    quotaGiven?: number;
}
