import { ProductModel } from '../product.model';
import { Product } from './product.interface';

const createProductIntoDB = async (product: Product) => {
  // What happend is that :  amader query cholbe model er upore and product amader ekta body return korbe jeta amra rakhtesi ekta variable e and jeta return kortesi oi variable diye . Lastly Return korle se chole jabe controller er kache

  const result = await ProductModel.create(product);
  return result;
};
// Getting all the products
const getAllProductsFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};

// Getting only one product
const getASingleProductFromDB = async (name: string) => {
  const result = await ProductModel.findOne({ name: name });
  return result;
};

// jate amra ekta controller tekhe call dite pari tai eta ekhan tekhe export korbo
export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getASingleProductFromDB,
};
