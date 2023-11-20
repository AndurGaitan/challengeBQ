import mongoose from "mongoose";
import {products} from "../models/products.model.js"

const cartModel = mongoose.model('carts', new mongoose.Schema({
    
    products:[
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: productCollection,
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
            },
        }
    ],
}))

cartModel.pre(['find','findOne'], function(){
    this.populate(`${products}.product`)
})


export default cartModel;