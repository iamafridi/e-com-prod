import { Request, Response } from 'express';
import { ProductServices } from './product.service';

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product: productData } = req.body; //ekhane name allias use korsi
    //will call service function to send this data
    const result = await ProductServices.createProductIntoDB(productData);

    // Send Response
    res.status(200).json({
      success: true,
      message: 'Product is created Successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong !',
      error: err,
    }
};

  // Getting all the products
  const getAllProducts = async (req: Request, res: Response) => {
    try {
      const result = await ProductServices.getAllProductsFromDB();

      // Send Response
      res.status(200).json({
        success: true,
        message: 'Product is Retrieved  Successfully',
        data: result,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // getting only one Product by name
  const getASingleProduct = async (req: Request, res: Response) => {
    try {
      const { productName } = req.params;
      const result = await ProductServices.getASingleProductFromDB(productName);

      // sending Response
      res.status(200).json({
        success: true,
        message: 'Your Product Retrieved Successfully ',
        data: result,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // So that amra Route e use korte pari
  export const ProductControllers = {
    createProduct,
    getAllProducts,
    getASingleProduct,
  };
