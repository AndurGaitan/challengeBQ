import ProductService from "../services/product.services.js";

const productService = new ProductService()

export const getProducts = async (req, res) => {
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
        nextLink: hasNextPage ? `/api/products?limit=${limit}&page=${page + 1}&sort=${sort}&query=${query}` : null,
      };
  
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los productos' });
    }
  };
  
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

        return res.json(await productService.create(object))
    } catch(error) {
        console.error(`Error en productService.create ${error.message}`)
    }
    
}

export const updateProduct = async(req, res) => {
    const { id } = req.params
    const object = req.body
    

    return res.json(await productService.update(id, object))
}

export const removeProduct = async(req, res) => {

    const { pid } = req.params

    return res.json(await productService.remove(pid))
}