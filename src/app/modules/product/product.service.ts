import { Product } from '../product.model';
import { TProduct } from './product.interface';

const createProductIntoDB = async (productData: TProduct) => {
  if (await Product.isUserExists(productData.id)) {
    throw new Error('Product Already Exists!')
  } // Coz we already did indexing In mongodb that's why

  // What happend is that :  amader query cholbe model er upore and product amader ekta body return korbe jeta amra rakhtesi ekta variable e and jeta return kortesi oi variable diye . Lastly Return korle se chole jabe controller er kache


  const result = await Product.create(productData); //Mongoose Built in Static Method






  // const product = new Product(productData); //Creating an Instance 

  // if (await product.isUserExists(productData.id)) {
  //   throw new Error('Product Already Exists!')
  // }
  //  const result = await product.save(); //eta async tai await use korechi , built in Instance Method

  return result;
};
// Getting all the products
const getAllProductsFromDB = async () => {
  const result = await Product.find();
  return result;
};

// Getting only one product
const getASingleProductFromDB = async (name: string) => {
  const result = await Product.findOne({ name: name });
  return result;
};

// jate amra ekta controller tekhe call dite pari tai eta ekhan tekhe export korbo
export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getASingleProductFromDB,
};
