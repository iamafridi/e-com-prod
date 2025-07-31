import { Schema, model } from 'mongoose';
import { Inventory, Product, Variant } from './product/product.interface';

// Creating schema
const VariantSchema = new Schema<Variant>(
  {
    type: {
      type: String,
      required: [true, 'Variant type is required.'],
      trim: true,
    },
    value: {
      type: String,
      required: [true, 'Variant value is required.'],
      trim: true,
    },
  },
  { _id: false },
);
//jate etar jonno alada mongodb te id create na hoy

const inventorySchema = new Schema<Inventory>(
  {
    quantity: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Boolean,
      required: true,
    },
  },
  { _id: false },
);

const productSchema = new Schema<Product>({
  name: {
    type: String,
    required: [true, 'Product name is required.'],
    trim: true,
    validate: {
      validator: function (value: string) {
        const nameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return nameStr === value;
      },
      message: '{VALUE} is not in capitalize format',
    },
  },
  description: { type: String },
  price: { type: Number, required: [true, 'Product price is required.'] },
  category: {
    type: String,
    required: [true, 'Product category is required.'],
    trim: true,
  },
  tags: { type: [String], default: [] },
  variants: {
    type: [VariantSchema],
    required: [true, 'At least one product variant is required.'],
  },
  inventory: {
    type: inventorySchema,
    required: [true, 'Product inventory information is required.'],
  },
});

// Creating Model
export const ProductModel = model<Product>('Product', productSchema);
