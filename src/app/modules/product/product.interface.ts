import { Model } from 'mongoose';

export type TVariant = {
  type: string;
  value: string;
};

export type TInventory = {
  quantity: number;
  inStock: boolean;
};

export type TProduct = {
  id: string;
  password: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  tags: string[];
  variants: TVariant[];
  inventory: TInventory;
  isDeleted: boolean;
};

// For Creating Static Method 
export interface ProductModel extends Model<TProduct> {
  isUserExists(id: string): Promise<TProduct | null>
}



// For Creating Instance Method 
// export type ProductMethods = {
//   isUserExists(id: string): Promise<TProduct | null>;
// };



// export type ProductModel = Model<
//   TProduct,
//   Record<string, never>,
//   ProductMethods
// >;
