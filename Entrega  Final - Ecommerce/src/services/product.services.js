import { Product } from '../DAO/factory.js'

const ProductDao = new Product()

export default class ProductService {
    get = async(limit, page, sort, query) => {
    try{
        return await ProductDao.get({limit, page, sort, query})
    }catch(error){
        console.error('Error en el servicio ProductService:', error);
    throw error; 
    }
    }

    getById = async(id) => {
        return await ProductDao.getById(id)
    }

    create = async(object) => {
        try {
            return await ProductDao.create(object)
        } catch (error) {
            throw error;
        }
    }

    update = async(id, object) => {
        return await ProductDao.update(id, object)
    }

    remove = async(pid) => {
        return await ProductDao.remove(pid)
    }
}