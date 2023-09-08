import mongoose from 'mongoose'

const cartsCollections = 'carts'

const cartSchema = new mongoose.Schema({
  id: Number,
  products: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product' }],
  quantity: Number,
})

const cartModel = mongoose.model(cartsCollections, cartSchema)

export default cartModel