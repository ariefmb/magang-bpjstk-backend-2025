import { NextFunction, Request, Response } from "express";

export const requireUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const user = res.locals.user;
    if (!user) {
        res.status(403).send({
            status: false,
            statusCode: 403,
            message: "Forbidden",
        });

        return;
    }

    return next();
};

export const requireAdmin = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const user = res.locals.user;
    if (!user || user._doc.role !== "admin") {
        res.status(403).send({
            status: false,
            statusCode: 403,
            message: "Forbidden",
        });

        return;
    }

    return next();
};
