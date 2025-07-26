import express, { Application, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()
const port = 3000

// Parser
app.use(express.json())
app.use(cors())

const getAController = (req: Request, res: Response) => {
  res.send('Hello World!')
}

app.get('/', getAController)


export default app;