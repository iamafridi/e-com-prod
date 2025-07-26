import express from 'express'
import { ProductControllers } from './product.controller'

const router = express.Router() //eta amader ekta obj dibe 

// will call controller func
router.post('/create-product', ProductControllers.createProduct)


export const ProductRoutes = router;  //coz amader router nijei ekta obj