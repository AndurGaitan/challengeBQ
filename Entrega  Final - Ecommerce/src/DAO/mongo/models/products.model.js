import mongoose from "mongoose";
import { productCollection } from "../constants/constants.js";
import mongoosePaginate from 'mongoose-paginate-v2'

const productSchema = new mongoose.Schema({
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
        default: true, 
    },
    category: {
        type: String,
        required: true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel', 
        required: true,
    }

})

productSchema.plugin(mongoosePaginate);

const ProductModel = mongoose.model(productCollection, productSchema);

export default ProductModel;