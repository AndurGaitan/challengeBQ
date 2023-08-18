import { Router } from 'express'
import productsModel from '../dao/mongoManager/models/product.model.js'

const router = Router()


router.get('/', async (req, res) => {
    const result = await productsModel.find()
    res.send(result)
})

router.post('/', async (req, res) => {
    const data = req.body
    const result = await productsModel.create(data)
    res.send(result) 
})
  
export default router