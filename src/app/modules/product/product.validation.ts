import { z } from 'zod';

// ----------------------
// Variant schema
// ----------------------
const VariantValidationSchema = z.object({
    type: z.string().trim().min(1, { message: 'Variant type is required.' }),
    value: z.string().trim().min(1, { message: 'Variant value is required.' }),
});

// ----------------------
// Inventory schema
// ----------------------
const InventoryValidationSchema = z.object({
    quantity: z
        .number({ invalid_type_error: 'Quantity must be a number' })
        .min(0, { message: 'Quantity cannot be negative' }),
    inStock: z.boolean({ required_error: 'InStock is required' }),
});

// ----------------------
// Product schema
// ----------------------
const ProductValidationSchema = z.object({
    id: z.union([z.string(), z.number()]),
    password: z.string().max(20),
    name: z.string().trim().min(2, { message: 'Product name is too short' }),
    // Not validating capital letter or digits intentionally
    // since product names like iPhone are valid.

    description: z.string().trim().optional(),

    price: z
        .number({ invalid_type_error: 'Price must be a number' })
        .min(0, { message: 'Price must be a positive number' }),

    category: z
        .string()
        .trim()
        .min(1, { message: 'Product category is required.' }),

    tags: z.array(z.string()).default([]),

    variants: z
        .array(VariantValidationSchema)
        .min(1, { message: 'At least one product variant is required.' }),

    inventory: InventoryValidationSchema,
    isDeleted: z.boolean(),
});

export default ProductValidationSchema;
