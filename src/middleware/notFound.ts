import { Request, Response, NextFunction } from "express";

export const notFoundHandler = (req: Request, res: Response) => {
    res.status(404).json({
        error: "Not found",
        path: req.path,
        method: req.method,
        timestamp: new Date().toISOString(),
    });
};
