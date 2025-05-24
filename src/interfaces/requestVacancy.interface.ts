export interface requestVacancyInterface {
    reqVacancy_id: string;
    title: string;
    status: string;
    unit: string;
    mentor_name: string;
    mentor_email: string;
    contact: string;
    position: string;
    quota: number;
    tw: number;
    duration: number;
    city: string;
    location: string;
    working_model: string;
    open_vacancy: Date;
    close_vacancy: Date;
    description?: string | "";
    quotaGiven?: number;
}
