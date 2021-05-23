import express from 'express'
import asyncHandler from 'express-async-handler'

const router = express.Router()

import Product from '../models/productModel.js'

// @desc    Fetch all products
// @route   GET /api/products/
// @access  Public
router.get('/', asyncHandler( async (req, res) => {
  const products = await Product.find({})
  // test if error on dispatch productList action  
  // res.status(401)
    // throw new Error('Not Authorized')
  res.status(200).json(products)
}))

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', asyncHandler( async (req, res) => {
  //   const product = products.find((x) => x._id === req.params.id)
  const product = await Product.findById(req.params.id)

  if (product) {
    res.status(200).json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
}))

export default router
