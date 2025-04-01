import { Response } from "express";
import { PaginationMetadataDto } from "./pagination";

export class SuccessResponse {
    static send(
        res: Response,
        data: any,
        message = "Success",
        statusCode = 200
    ) {
        return res.status(statusCode).json({
            success: true,
            message,
            data,
        });
    }

    static sendPaginated<T>(
        res: any,
        items: T[],
        meta: PaginationMetadataDto,
        message = "Success",
        statusCode = 200
    ) {
        return res.status(statusCode).json({
            message,
            data: items,
            meta,
        });
    }
}
