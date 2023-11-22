import ProductModel from "./models/products.model.js";

export default class Product {
    get = async () => {
        try {
            const product = await ProductModel.paginate(query, options);
            return product;
        } catch (error) {
            throw error
        }
    }

    getById = async (id) => {
        try{
            const products = await ProductModel.findById(id)
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