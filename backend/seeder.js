import mongoose from 'mongoose'
import dotenv from 'dotenv'

import users from './data/users.js'
import products from './data/products.js'

import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const createdUser = await User.insertMany(users)
        console.log(createdUser)

        const adminUser = createdUser[0]._id
        console.log(adminUser)

        const sampleProducts = products.map( product => {
            return { ...product, user: adminUser }
        })
        console.log(sampleProducts)

        await Product.insertMany(sampleProducts)

        console.log('Data imported succesfully')
        process.exit()

    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log('Data deleted succesfully')
        process.exit()

    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}