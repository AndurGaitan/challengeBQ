import Stripe from 'stripe'
import config from "../config/config.js";

//PRIVATE KEY
const key = config.privateKeyPayment


export default class PaymentService {
    constructor() {
        this.stripe = new Stripe(key)
    }

    createPaymentIntent = async(data) => {
        const paymentIntent = this.stripe.paymentIntents.create(data)

        return paymentIntent
    }
}