import mongoose from 'mongoose'

const productsCollections = 'products'

const productsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: Boolean, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  thumbnails: [String],
})

const productsModel = mongoose.model(productsCollections, productsSchema)

export default productsModel