import { Router } from 'express'
import productsModel from '../dao/mongo/models/product.model.js'

const router = Router()

router.get('/', async (req, res) => {
    const products = await productsModel.find().lean()
    res.render('products', { products })
})

router.post('/form', async (req, res) => {
    const data = req.body
    const result = await productsModel.create(data)
    res.send(result) 
})      
  
export default router