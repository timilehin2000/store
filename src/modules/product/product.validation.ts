import Joi from "joi";

const productValidation = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required().min(0),
    description: Joi.string().required(),
    category: Joi.string().required(),
    stockQuantity: Joi.number().required(),
    imageUrl: Joi.string().optional(),
});

export { productValidation };
