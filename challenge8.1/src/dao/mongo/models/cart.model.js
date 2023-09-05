import mongoose from 'mongoose'

const cartsCollections = 'carts'

const cartSchema = new mongoose.Schema({
  products: {
    type: [{
        id: Number,
        quantity: Number
    }]
  }
})

const cartModel = mongoose.model(cartsCollections, cartSchema)

export default cartModel