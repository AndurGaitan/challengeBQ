import ProductService from "../services/product.services.js";
import logger from '../logger/logger.js'

const productService = new ProductService()

export const getProducts = async(req, res) => { 
    const limit = parseInt(req.query.limit) || 10; 
    const page = parseInt(req.query.page) || 1; 
    const sort = req.query.sort || 'asc'; 
    const query = req.query.query || '';

try {
    const result = await productService.get(limit, page, sort, query);
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
}
//(req, res) => {
//         try {
//                 const {page = 1, limit = 2, sort, query, category, avaible} = req.query;
        
//                 const options ={
//                     page: parseInt(page),
//                     limit: parseInt(limit),
//                     sort: sort === 'asc' ? {price: 1 } : sort === 'desc' ? {price: -1} :undefined
//                 };
        
//                 const filter = {};
        
//                 if(query) {
//                     filter.$text = {$search: query};
//                 }
        
//                 if(category){
//                     filter.category = category
//                 }
        
//                 if(avaible){
//                     filter.avaible = avaible === 'true'
//                 }
        
        
//                 const  productPaginated = await productService.get(options)
//                 console.log(productPaginated)
        
        
//                 const response = {
//                     status: 'Success',
//                     payload: productPaginated.docs,
//                     totalPages: productPaginated.totalPages,
//                     prevPage: productPaginated.prevPage,
//                     nextPage: productPaginated.nextPage,
//                     page: productPaginated.page,
//                     hasPrevPage: productPaginated.hasPrevPage,
//                     hasNexPage: productPaginated.hasNexPage,
//                     prevLink: productPaginated.prevPage ? `/products?page${productPaginated.prevPage}` : null,
//                     nextPage: productPaginated.nextPage ? `/products?page${productPaginated.nextPage}` : null,
//                 }
        
        
//                 res.status(200).json(productPaginated)
        
//             } catch (error) {
//                 if(error instanceof Error) {
//                     res.status(404).json({error: error.message})
//                 } else {
//                     res.status(500).json({error: 'No se pudo obtener los productos'})
//                 }
//             }
//     // return res.json(await productService.get())
// }

export const getProductById = async(req, res) => {
    try {
        const product = await productService.getById(req.params)
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    
}

export const createProduct = async(req, res) => {
    try{
        const object = req.body
        logger.info('Producto creado con exito')

        return res.json(await productService.create(object))
    } catch(error) {
        logger.error(`Error en productService.create ${error.message}`)
        next(error);
    }
    
}

export const updateProduct = async(req, res) => {
    const { id } = req.params
    const object = req.body
    

    return res.json(await productService.update(id, object))
}

export const removeProduct = async(req, res) => {
    const { id } = req.params

    return res.json(await productService.remove(id))
}