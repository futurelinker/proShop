import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderItems: [
        {
            name: { type: String, required: true},
            qty: { type: Number, required: true},
            image: { type: String, required: true},
            price: { type: Number, required: true},
            product: { 
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true},
        }
    ],
    shoppingAdress: {
        address: { type: String, required: true },
        city: { type: String, required: true }, 
        postalCode: { type: String, required: true },
        country: { type: String, required: true } 
    },
    paymentMethod: {
        type: String,
        require: true,
    },
    paymentMethodResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_adsress: { type: String },
    },
    taxPrice: {
        type: Number,
        require: true,
        default: 0.0
    },
    shippingPrice: {
        type: Number,
        require: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        require: true,
        default: 0.0
    },
    isPaid: {
        type: Boolean,
        require: true,
        default: false
    },
    isDeliveredAt: {
        type: Date
    },

}, {
    timestamps: true
})

const Order = mongoose.model('Order', orderSchema)

export default Order


