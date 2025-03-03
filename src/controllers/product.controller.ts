import { Request, Response } from 'express'
import { logger } from '../utils/logger'
import { createProductValidation } from '../validations/product.validation'

export const getProducts = (req: Request, res: Response) => {
  const products = [
    { name: 'Sepatu', price: '2000000' },
    { name: 'Kaos', price: '150000' }
  ]

  const {
    params: { name }
  } = req

  if (name) {
    const filterProduct = products.filter((product) => {
      if (product.name === name) {
        return product
      }
    })
    if (filterProduct.length === 0) {
      logger.info('Data not found')
      res.status(404).send({ status: false, statusCode: 404, message: 'Data not found', data: {} })
    } else {
      logger.info('Success get product data')
      res
        .status(200)
        .send({ status: true, statusCode: 200, message: 'Success get product data', data: filterProduct[0] })
    }
  } else {
    logger.info('Success get product data')
    res.status(200).send({ status: true, statusCode: 200, message: 'Success get product data', data: products })
  }
}

export const createProduct = (req: Request, res: Response) => {
  const { error, value } = createProductValidation(req.body)
  if (error) {
    logger.error(`ERR: product - create = ${error.details[0].message}`)
    res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message, data: {} })
  } else {
    logger.info(`Success post product data ${req.body.name}`)
    res.status(200).send({ status: true, statusCode: 200, message: 'Add product successfully', data: value })
  }
}
