import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { ProductRoutes } from './app/modules/product/product.route'
const app: Application = express()
const port = 3000

// Parser
app.use(express.json())
app.use(cors())

//api/v1/products/create-product

// Application Routes
app.use('/api/v1/products', ProductRoutes);






const getAController = (req: Request, res: Response) => {
  res.send('Hello World!')
}

app.get('/', getAController)


export default app;