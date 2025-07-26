import { Request, Response } from "express";
import { ProductServices } from "./product.service";

const createProduct = async (req: Request, res: Response) => {
    try {
        const { product: productData } = req.body; //ekhane name allias use korsi
        //will call service function to send this data
        const result = await ProductServices.createProductIntoDB(productData)


        // Send Response
        res.status(200).json({
            success: true,
            message: "Product is created Successfully",
            data: result,
        });

    } catch (err) {
        console.log(err)
    }
};

// So that amra Route e use korte pari
export const ProductControllers = {
    createProduct,
}