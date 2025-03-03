import { Router, Request, Response, NextFunction } from 'express'
import { logger } from '../utils/logger'
import { createProductValidation } from '../validations/product.validation'

export const ProductRouter: Router = Router()

ProductRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  logger.info('Success get product data')
  res.status(200).send({ status: true, statusCode: 200, data: [{ name: 'Sepatu', price: '5000000' }] })
})

ProductRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = createProductValidation(req.body)
  if (error) {
    logger.error(`ERR: product - create = ${error.details[0].message}`)
    res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message, data: {} })
  } else {
    logger.info(`Success post product data ${req.body.name}`)
    res.status(200).send({ status: true, statusCode: 200, message: 'Add product successfully', data: value })
  }
})
