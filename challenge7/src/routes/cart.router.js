import { Router } from 'express'
import cartModel from '../dao/mongo/models/cart.model.js'
const router = Router()


router.get('/', async (req, res) => {
    const result = await cartModel.find()
    res.send(result)
})

router.get('/:idc/:idp', async (req, res) => {
    const idc = parseInt(req.params.idc)
    const idp = parseInt(req.params.idp)
    const quantity = req.query.quantity || 5
    const cart = await cartModel.findById(idc)
    cart.products.push({id:idp, quantity })
    const result = cart.save()
    res.send(result)
})

router.post('/', async (req, res) => {
    const result = await cartModel.create({products: []})
    res.send(result)
})

export default router