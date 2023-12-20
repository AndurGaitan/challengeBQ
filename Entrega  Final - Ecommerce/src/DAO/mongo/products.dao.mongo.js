import ProductModel from "./models/products.model.js";

export default class Product {
    get = async ({limit, page, sort, query}) => {
        try {
            const options = {
                limit: parseInt(limit),
                page: parseInt(page),
                sort: sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : undefined,
              };

            const product = await ProductModel.paginate(query, options);
            return {
                products: product.docs,
                totalCount: product.totalDocs,
              }
        } catch (error) {
            console.error('Error en el servicio ProductService:', error);
            throw error;
        }
    }

    getById = async (pid) => {
        try{
            const products = await ProductModel.findById(pid)
            return products
        } catch (error){
            throw new Error("Error al obtener los productos por ID", error.message)
        }
    }

    create = async (product) => {
        try{
            return await ProductModel.create(product)            
        } catch (error){
            throw new Error(`Error al guardar el producto ${error.message}`)
        }
        
    }

    update = async (id, product) => {
        try{
            return await ProductModel.findByIdAndUpdate(id, product)
        } catch {
            throw new Error(`Error al actualizar el producto ${id} ${error.message}`)
        }
        
    }

    remove = async (id) => {
        try{
            return await ProductModel.findByIdAndDelete(id)
        } catch {
            throw new Error(`Error al eliminar el producto ${id} ${error.message}`)
        }
       
    }
}