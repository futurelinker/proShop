const express = require('express');
const morgan = require('morgan')
const products = require('./data/products');

const app = express()

app.use(morgan('dev'))

app.get('/api/products', (req, res,) => {
    res.status(200).json(products)
})

app.get('/api/product/:id', (req, res,) => {
    const product = products.find(x => x._id === req.params.id)
    res.status(200).json(product)
})

app.listen(5000, console.log('server runing on port 5000'))
