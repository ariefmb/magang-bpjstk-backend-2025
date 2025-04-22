import cors from 'cors'
import express, { Application, Request, Response, NextFunction } from 'express'
import { routes } from './routes'
import { logger } from './utils/logger'

const app: Application = express()
const port = 4000

// parse body request
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// cors access handler
app.use(cors())
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  next()
})

routes(app)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message)
  res.status(500).json({ error: 'Internal Server Error' })
})

app.listen(port, () => logger.info(`Server is listening on port ${port}`))
