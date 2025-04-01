import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { HttpError } from "../utils";

const validate =
    (schema: Joi.ObjectSchema<any>) =>
    (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);

        if (error) {
            return next(
                new HttpError(
                    error.details.at(0)?.message || "Validation error",
                    400
                )
            );
        }

        next();
    };

const ObjectIdSchema = Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .message(
        "Invalid ID format. A valid MongoDB ObjectId must be a 24-character hexadecimal string."
    );

const validateParamsIds = (ids: string[]) => {
    const schema = Joi.object(
        ids.reduce(
            (acc, id) => ({
                ...acc,
                [id]: ObjectIdSchema,
            }),
            {}
        )
    );

    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.params);

        if (error) {
            return next(
                new HttpError(
                    error.details.at(0)?.message || "Validation error",
                    400
                )
            );
        }

        next();
    };
};

export { validate, validateParamsIds };
