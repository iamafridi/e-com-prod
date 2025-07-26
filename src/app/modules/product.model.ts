import { Schema, model, connect } from 'mongoose';
import { Product } from './product/product.interface';

const productSchema = new Schema<Product>({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    tags: { type: [String], default: [] },
    variants: [
        {
            type: {
                type: String,
                required: true,
            },
            value: {
                type: String,
                required: true,
            },
        },
    ],
    inventory: {
        quantity: { type: Number, required: true },
        inStock: { type: Boolean, required: true },
    },
});

