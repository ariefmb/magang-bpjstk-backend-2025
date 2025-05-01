export interface UserInterface {
    user_id: string;
    email: string;
    name: string;
    password: string;
    role: string | null | "";
}

export interface UserSessionInterface {
    email: string;
    password: string;
}
