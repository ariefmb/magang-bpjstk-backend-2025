export interface UserInterface {
    user_id: string;
    email: string;
    name: string;
    contact: string;
    password: string;
    role: string;
    photo: string;
    verified: boolean;
    unit: string;
}

export interface UserSessionInterface {
    email: string;
    password: string;
}

export interface resetPasswordInterface {
    email: string;
    password: string;
    otp: string;
}
