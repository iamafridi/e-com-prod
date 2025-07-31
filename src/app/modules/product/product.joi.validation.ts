import Joi from 'joi';
// Joi schema for variant
const variantValidationSchema = Joi.object({
    type: Joi.string().trim().required().messages({
        'string.empty': 'Variant type is required.',
    }),
    value: Joi.string().trim().min(1).required().messages({
        'string.empty': 'Variant value is required.',
        'string.min': 'Variant value cannot be empty',
    }),
});

// Joi schema for inventory
const inventoryValidationSchema = Joi.object({
    quantity: Joi.number().min(0).required().messages({
        'number.base': 'Quantity must be a number',
        'number.min': 'Quantity cannot be negative',
        'any.required': 'Quantity is required',
    }),
    inStock: Joi.boolean().required().messages({
        'any.required': 'InStock is required',
    }),
});

// Joi schema for the whole product
const ProductValidationSchema = Joi.object({
    name: Joi.string().trim().min(2).required().messages({
        'string.empty': 'Product name is required.',
        'string.min': 'Product name is too short',
    }),
    description: Joi.string().trim().allow(''),
    price: Joi.number().min(0).required().messages({
        'number.base': 'Price must be a number',
        'number.min': 'Price must be a positive number',
        'any.required': 'Product price is required.',
    }),
    category: Joi.string().trim().required().messages({
        'string.empty': 'Product category is required.',
    }),
    tags: Joi.array().items(Joi.string()).default([]),
    variants: Joi.array()
        .items(variantValidationSchema)
        .min(1)
        .messages({
            'array.min': 'At least one product variant is required.',
        })
        .required(),
    inventory: inventoryValidationSchema.required(),
});

export default ProductValidationSchema;
