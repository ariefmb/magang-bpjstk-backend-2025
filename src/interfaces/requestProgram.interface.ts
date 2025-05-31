export interface requestProgramInterface {
    reqProgram_id: string;
    user_id: string;
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
    start_date: Date;
    end_date: Date;
    description?: string | "";
    quotaGiven?: number;
}
