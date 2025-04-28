import jwt from "jsonwebtoken";
import CONFIG from "../config/environment";

export const signJWT = (
    payload: Object,
    options?: jwt.SignOptions | undefined
) => {
    return jwt.sign(payload, CONFIG.jwt_private_key, {
        ...(options && options),
        algorithm: "RS256",
    });
};

export const verifyJWT = (token: string) => {
    try {
        const decoded: any = jwt.verify(token, CONFIG.jwt_public_key);
        return {
            valid: true,
            expired: false,
            decoded,
        };
    } catch (error: any) {
        return {
            valid: false,
            expired: error.message === "jwt is expired or not eligible to use",
            decoded: null,
        };
    }
};
