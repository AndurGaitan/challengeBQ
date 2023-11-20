import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const ProductModel = mongoose.model('products', new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,

    },
    price: {
        type: Number,
        required: true,
    },

    thumbnails: {type: String},

    code: {
        type: String,
        required:true,
    },

    stock: {
        type: Number,
        required: true
    },

    status: {
        type: Boolean,
        default: true, // El campo "status" tendrá valor "true" por defecto al crear un nuevo producto
    },
    category: {
        type: String,
        required: true
    },

}))

ProductModel.plugin(mongoosePaginate);


export default ProductModel;

