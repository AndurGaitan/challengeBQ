import { Router } from "express";
import ProductManager from '../dao/fileManager/product.manager.js'
import productsModel from "../dao/mongo/models/product.model.js";

const router = Router()
const productManager = new ProductManager()


router.get('/', (req, res) => {
    res.render('login', {})
})


router.get('/products', async (req, res) => {
    const products = await productManager.list()
    res.render('products', { products })
})


router.get('/list', async (req, res) => {
    const page = parseInt(req.query?.page || 1)
    const limit = parseInt(req.query?.limit || 5)
    const queryParams = req.query?.query || ''
    const query = {}
    if(queryParams){
        const field = queryParams.split(',')[0]
        let value = queryParams.split(',')[1]

        if(!isNaN(parseInt(value))) value = parseInt(value)
        query[field] = value 
    }
    const result = await productsModel.paginate(query,{
        page:1,
        limit:10,
        lean:true
    })
    res.render('productsList', result)
})

router.get('/products-realtime', async (req, res) => {
    const products = await productManager.list()
    res.render('products_realtime', { products })
})

router.get('/form-products', async (req, res) => {
    res.render('form', {})
})

router.post('/form-products', async (req, res) => {
    const data = req.body
    const result = await productManager.create(data)

    res.redirect('/products')
})

export default router