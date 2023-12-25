import { Router } from "express";
import PaymentService from "../services/payment.services.js";

const router = Router()

//const products => Aqui implementar relacion con Ticket donde vamos a sacar el amount total 

router.post('/payment-intents', async (req, res) => {
    const productRequested = products.find(p => p.id == parseInt(req.query.id))
    if (!productRequested) return res.status(404).send('Product Not Found')

    const paymentIntentInfo = {
        amount: productRequested.price, //total del carrito extraido con ticket 
        currency: 'usd',
        payment_method_types: ["card"]
    }

    const service = new PaymentService()
    const result = await service.createPaymentIntent(paymentIntentInfo)

    console.log(result)
    return res.send({ status: 'success', payload: result })
})

export default router