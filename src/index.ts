// const express = require("express")
import express, { Application, Request, Response, NextFunction } from 'express' // karena pakai typescript, bisa menggunakan import
import { routes } from './routes'
import { logger } from './utils/logger'
import bodyParser from 'body-parser'
import cors from 'cors'

const app: Application = express()
const port = 4000

// parse body request
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// cors access handler
app.use(cors())
app.use((req, res, next) => {
    res.setHeader('Access-Allow-Control-Origin', '*')
    res.setHeader('Access-Allow-Control-Methods', '*')
    res.setHeader('Access-Allow-Control-Header', '*')
    next()
})

routes(app)

app.listen(port, () => logger.info(`Server is listening on port ${port}`))
