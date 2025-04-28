import { Document } from "mongoose";

export interface UserInterface extends Document {
    user_id: string;
    email: string;
    name: string;
    password: string;
    role: string | null | "";
}

export interface UserSessionInterface extends Document {
    email: string;
    password: string;
}
