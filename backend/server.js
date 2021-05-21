import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import products from './data/products.js'

dotenv.config()

const app = express()

app.use(morgan('dev'))

app.get('/api/products', (req, res) => {
  res.status(200).json(products)
})

app.get('/api/product/:id', (req, res) => {
  const product = products.find((x) => x._id === req.params.id)
  res.status(200).json(product)
})

const PORT = process.env.PORT || 500

app.listen(
  PORT,
  console.log(
    `Server runing in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
)

// Enable ECMAScript modules add Package.json "type" field -"type": "module", for Node version up to 14.6
