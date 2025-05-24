export interface ProgramInterface {
    program_id: string;
    title: string;
    status: string;
    unit: string;
    mentor_name: string;
    mentor_email: string;
    contact: string;
    position: string;
    quota: number;
    tw?: number;
    duration: number;
    city: string;
    location: string;
    working_model: string;
    journey: string;
    start_date: Date;
    end_date: Date;
    onBoarding_date?: Date | "";
    description?: string;
    template_suratPerjanjian?: string;
    template_suratPeminjamanIDCard?: string;
    template_logbook?: string;
    template_laporan?: string;
    link_group?: string;
}
