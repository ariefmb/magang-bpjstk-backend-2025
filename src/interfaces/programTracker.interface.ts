export interface programTrackerInterface {
    programTracker_id: string;
    vacancy_id: string;
    unit: string;
    mentor_name: string;
    contact: string;
    working_model: "Work At Office" | "work at office" | "Work From Home" | "work from home";
    city: string;
    location: string;
    journey: "Administration" | "Interview" | "Offering" | "Confirmation" | "Working Experience" | "Graduation";
    start_date: Date;
    end_date: Date;
    onBoarding_date: Date | null | "";
    template_suratPerjanjian: string | "";
    template_suratPeminjamanIDCard: string | "";
    template_logbook: string | "";
    template_laporan: string | "";
    link_group: string | "";
}

export interface zoomAssignInterface {
    zoomAssign_id: string;
    applicant_id: string;
    place: string;
    datetime: Date;
    link: string;
}

export interface feedbackMentorInterface {
    feedbackMentor_id: string;
    applicant_id: string;
    logbook: string;
    feedback: string;
}

export interface certificateMenteeInterface {
    certificateMentee_id: string;
    applicant_id: string;
    certificate: string;
}
