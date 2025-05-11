export interface ApplicantInterface {
    applicant_id: string;
    name: string;
    nik: string;
    email: string;
    contact: string;
    photo: string;
    institution: string;
    major: string;
    semester: number;
    no_suratPengantar: string;
    suratPengantar: string;
    cv: string;
    portfolio: string;
    journey:
        | "Administration"
        | "Interview"
        | "Offering"
        | "Confirmation"
        | "Working Experience"
        | "Graduation";
    status: "Approved" | "Rejected" | "On Going" | "Waiting";
}
