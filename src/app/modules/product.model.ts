import { Schema, model, connect } from 'mongoose';
import { Inventory, Product, Product, Product, Variant } from './product/product.interface';

// Creating schema
const VariantSchema = new Schema<Variant>(
    {
        type: { type: String, required: true },
        value: { type: String, required: true },
    },
    { _id: false }); //jate etar jonno alada mongodb te id create na hoy


const inventorySchema = new Schema<Inventory>({

    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },

}, { _id: false }))

const productSchema = new Schema<Product>({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    tags: { type: [String], default: [] },
    variants: [VariantSchema],
    inventory: inventorySchema,
});

// Creating Model
export const ProductModel = model<Product>('Product', productSchema);