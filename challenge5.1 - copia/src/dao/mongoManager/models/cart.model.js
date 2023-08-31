import mongoose from 'mongoose'

const cartsCollections = 'carts'

const cartSchema = new mongoose.Schema({
  products: {
    type: [{
        id: String,
        quantity: Number
    }]
  }
})

const cartModel = mongoose.model(cartsCollections, cartSchema)

export default cartModel