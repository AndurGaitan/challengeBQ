import { Router } from 'express'
import productsModel from '../dao/mongo/models/product.model.js'

const router = Router()

// router.get('/', async (req, res) => {
//     const products = await productsModel.find().lean()
//     res.render('products', { products })
// })

router.get('/', async (req, res) => { 
    const limit = parseInt(req.query.limit) || 10; 
    const page = parseInt(req.query.page) || 1; 
    const sort = req.query.sort || 'asc'; 
    const query = req.query.query || '';

try {
    const result = await productMongo.getProductsPaginated(limit, page, sort, query);
    const totalPages = Math.ceil(result.totalCount / limit);
    const hasPrevPage = page > 1;
    const hasNextPage = page < totalPages;

    const response = {
        status: 'success',
        payload: result.products,
        totalPages,
        prevPage: hasPrevPage ? page - 1 : null,
        nextPage: hasNextPage ? page + 1 : null,
        page,
        hasPrevPage,
        hasNextPage,
        prevLink: hasPrevPage ? `/api/products?limit=${limit}&page=${page - 1}&sort=${sort}&query=${query}` : null,
        nextLink: hasNextPage ? `/api/products?limit=${limit}&page=${page + 1}&sort=${sort}&query=${query}` : null
    };

    res.status(200).json(response);
} catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
}
});

router.get('/form', (req, res) => {
    res.render('form', {})
})

router.post('/form', async (req, res) => {
    const data = req.body
    const result = await productsModel.create(data)
    return res.redirect('/api/products/')
})      
  
export default router