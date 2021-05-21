import  mongoose from "mongoose";
import dotenv from 'dotenv'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.ATLAS_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
        })

        console.log(`Database connected: ${conn.connection.host}`)
    } catch (err) {
        console.error(`Error: ${err.message}`)
        process.exit(1)
    }
}

export default connectDB