export interface OTPInterface {
    otp_id: string;
    email: string;
    otp: string;
    createdAt: Date;
}

export interface EmailDetailsInterface {
    email: string;
    subject: string;
    body: string;
}