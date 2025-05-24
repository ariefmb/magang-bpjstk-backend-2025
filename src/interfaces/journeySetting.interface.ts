export interface zoomAssignInterface {
    zoomAssign_id: string;
    program_id: string;
    applicant_id: string;
    place: string;
    datetime: Date;
    link: string | "";
}

export interface reportMenteeInterface {
    reportMentee_id: string;
    program_id: string;
    applicant_id: string;
    title: string;
    report: string;
    feedback_mentee: string;
    feedback_to_mentor: string;
    status: string;
    feedback_mentor: string[];
}

export interface certificateMenteeInterface {
    certificateMentee_id: string;
    program_id: string;
    applicant_id: string;
    certificate: string;
}
