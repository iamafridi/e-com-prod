import { Schema, model } from 'mongoose';
// import validator from 'validator';
import {
  ProductModel,
  TInventory,
  TProduct,
  TVariant,
} from './product/product.interface';
import bcrypt from 'bcrypt';
import config from '../config';

// Creating schema
const VariantSchema = new Schema<TVariant>(
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
const inventorySchema = new Schema<TInventory>(
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

const productSchema = new Schema<TProduct, ProductModel>({
  id: { type: String, required: [true, 'ID is required'], unique: true },
  password: {
    type: String,
    required: [true, 'Password is required'],
    maxlength: [20, 'Password Can not be more that 20 characters'],
  },
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
  isDeleted: {
    type: Boolean,
    default: false,
  }
});

// Pre save Middleware /Hook : will work on create() and save ()
productSchema.pre('save', async function (next) {
  // console.log(this, 'Pre Hook : We will save the data');
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; //this amader current document ke reffer kortese 
  //Hashing Password
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// Post Save Middleware /hook
productSchema.post('save', function (doc, next) {
  doc.password = '';
  // console.log(this, 'Post Hook : We Have saved your data');
  next();
});


//  Query Middleware
productSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } }); // Delete howa chara jey document gula ase oigula
  next();
});

// for single data 
productSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } }); // Delete howa chara jey document gula ase oigula
  next();
});

// For aggregation too.
productSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});


// Creating Custom Static Method
productSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Product.findOne({ id });
  return existingUser;
};

// Custom Instance Method
// productSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Product.findOne({ id }); // as we are using es6
//   return existingUser;
// };

// Creating Model
export const Product = model<TProduct, ProductModel>('Product', productSchema);
