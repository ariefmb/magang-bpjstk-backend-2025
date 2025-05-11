export interface VacancyInterface {
    vacancy_id: string;
    title: string;
    status: "Open" | "open" | "Closed" | "closed" | "Pending" | "pending";
    unit: string;
    mentor_name: string;
    contact: string;
    position: string;
    quota: number;
    tw: number;
    duration: number;
    city: string;
    working_model:
        | "Work At Office"
        | "work at office"
        | "Work From Home"
        | "work from home";
    open_vacancy: Date;
    close_vacancy: Date;
    description?: string | "";
}
