import Joi from "joi";
import { UserRoleEnum } from "../../interfaces";

const registerValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
        .required()
        .min(8)
        .max(30)
        .pattern(
            new RegExp(
                "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
            )
        )
        .messages({
            "string.empty": "Password cannot be empty",
            "string.min": "Password must be at least 8 characters long",
            "string.max": "Password cannot exceed 30 characters",
            "string.pattern.base":
                "Password must contain at least: 1 uppercase, 1 lowercase, 1 number, and 1 special character",
        }),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    role: Joi.string()
        .valid(...Object.values(UserRoleEnum))
        .required(),
});

const loginValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export { registerValidation, loginValidation };
