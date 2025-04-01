import { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils";

export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (err instanceof HttpError) {
        res.status(err.statusCode).json({ error: err.message });
    } else {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}
