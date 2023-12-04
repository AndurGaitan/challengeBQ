import ProductService from "../services/product.services.js";

const productService = new ProductService()

export const getProducts = async(req, res) => {
        try {
                const {page = 1, limit = 2, sort, query, category, avaible} = req.query;
        
                const options ={
                    page: parseInt(page),
                    limit: parseInt(limit),
                    sort: sort === 'asc' ? {price: 1 } : sort === 'desc' ? {price: -1} :undefined
                };
        
                const filter = {};
        
                if(query) {
                    filter.$text = {$search: query};
                }
        
                if(category){
                    filter.category = category
                }
        
                if(avaible){
                    filter.avaible = avaible === 'true'
                }
        
        
                const  productPaginated = await productService.get(options)
        
        
                const response = {
                    status: 'Success',
                    payload: productPaginated.docs,
                    totalPages: productPaginated.totalPages,
                    prevPage: productPaginated.prevPage,
                    nextPage: productPaginated.nextPage,
                    page: productPaginated.page,
                    hasPrevPage: productPaginated.hasPrevPage,
                    hasNexPage: productPaginated.hasNexPage,
                    prevLink: productPaginated.prevPage ? `/products?page${productPaginated.prevPage}` : null,
                    nextPage: productPaginated.nextPage ? `/products?page${productPaginated.nextPage}` : null,
                }
        
        
                res.status(200).json(response)
        
            } catch (error) {
                if(error instanceof Error) {
                    res.status(404).json({error: error.message})
                } else {
                    res.status(500).json({error: 'No se pudo obtener los productos'})
                }
            }
    //return res.json(await productService.get())
}

export const getProductById = async(req, res) => {
    const { id } = req.params
    return res.json(await productService.getById(id))
}

export const createProduct = async(req, res) => {
    try{
        const object = req.body

        return res.json(await productService.create(object))
    } catch(error) {
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