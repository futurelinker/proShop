import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'

import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import productsRoutes from './routes/productRoutes.js'


dotenv.config()

connectDB()

const app = express()

// Middlewares
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.send('API is running')
})

app.use('/api/products', productsRoutes)

// Error handler
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 500

app.listen(
  PORT,
  console.log(
    `Server runing in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
)

// Enable ECMAScript modules add Package.json "type" field -"type": "module", for Node version up to 14.6
