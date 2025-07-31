import { Schema, model } from 'mongoose';
// import validator from 'validator';
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
      minlength: 1,
    },
  },
  { _id: false },
);

// jate etar jonno alada mongodb te id create na hoy
const inventorySchema = new Schema<Inventory>(
  {
    quantity: {
      type: Number,
      required: true,
      min: [0, 'Quantity cannot be negative'],
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
    minlength: [2, 'Product name is too short'],
    unique: true,
    /*
    Not using validator here because I am using phone model and other electronic device name as name so it contains small letter as the first letter such as iPhone and numbers in name so commented it 
    */

    // validate: {
    //   validator: function (value: string) {
    //     return /^[A-Z]/.test(value); // Just check first char is capital
    //   },
    //   message: '{VALUE} must start with a capital letter',
    // },
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Product price is required.'],
    min: [0, 'Price must be a positive number'],
  },
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
