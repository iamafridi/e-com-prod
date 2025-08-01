import { Request, Response } from 'express';
import { ProductServices } from './product.service';
// import ProductValidationSchema from './product.validation';
import { z } from 'zod';
import ProductValidationSchema from './product.validation';


// Create a product
const createProduct = async (req: Request, res: Response) => {
  try {
    const { product: productData } = req.body; // ekhane name allias use korsi

    /* Custom Validation Using zod*/
    const zodParseData = ProductValidationSchema.parse(productData);

    /* //JOI VALIDATION will call service function to send this data
 
     // Data validating with joy
     // const { error, value } = ProductValidationSchema.validate(productData);
     // console.log({ error }, { value });
    */

    const result = await ProductServices.createProductIntoDB(zodParseData);

    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Something went wrong !',
    //     error: error.details, // error: error, jehetu amra es6 use kortesi sehetu eta use na korleo chole amader
    //   });
    // }

    /**
     ekhane req.body amader product data receive korbe and eta amra joi diye validate korbo.
     Here req.body receives our product data and we will validate it using joi. 
     */

    // Send Response
    res.status(200).json({
      success: true,
      message: 'Product is created Successfully',
      data: result,
    });

  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong !',
      error: err,
    });
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

  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong !',
      error: err,
    });
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

  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong !',
      error: err,
    });
  }
};


// get single product by ID
const getSingleProductByIdFromDB = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductByIdFromDB(productId);
    res.status(200).json({
      success: true,
      message: 'Your Product Retrieved Successfully ',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong !',
      error: err,
    });
  }
};

// Delete a single product by ID 
const deleteSingleProductFromDB = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteSingleProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: 'Your Product Deleted Successfully ',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong !',
      error: err,
    });
  }
};


// So that amra Route e use korte pari
export const ProductControllers = {
  createProduct,
  getAllProducts,
  getASingleProduct,
  getSingleProductByIdFromDB,
  deleteSingleProductFromDB,
};
