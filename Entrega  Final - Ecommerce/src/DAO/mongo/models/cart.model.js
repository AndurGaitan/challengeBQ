import mongoose from "mongoose";
import { cartCollection } from "../constants/constants.js";
import { productCollection } from "../constants/constants.js";

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel', // Asegúrate de que 'User' sea el nombre correcto de tu modelo de usuario
        required: true,
    },
    products: [
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
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

cartSchema.pre(['find', 'findOne'], function () {
    this.populate('user').populate(`${productCollection}.product`);
});

const CartModel = mongoose.model(cartCollection, cartSchema);

export default CartModel;
