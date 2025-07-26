import express from 'express'
import { ProductControllers } from './product.controller'

const router = express.Router() //eta amader ekta obj dibe 

// will call controller func
router.post('/create-product', ProductControllers.createProduct)
// getting all the students
router.get('/', ProductControllers.getAllProducts)

// getting a single product by name 
router.get('/:productName', ProductControllers.getASingleProduct)


export const ProductRoutes = router;  //coz amader router nijei ekta obj