import { NextFunction, Request, Response } from "express";

export const authorization = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = res.locals.user;

        if (!user || !roles.includes(user._doc.role)) {
            res.status(403).send({
                status: false,
                statusCode: 403,
                message: "Forbidden",
            });

            return;
        }

        return next();
    };
};
