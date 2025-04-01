import Joi from "joi";

const createCategoryValidation = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
});

const categoryValidation = Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
});

export { createCategoryValidation, categoryValidation };
