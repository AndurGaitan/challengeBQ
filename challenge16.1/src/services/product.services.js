import { Product } from '../DAO/factory.js'

const ProductDao = new Product()

export default class ProductService {
    get = async(limit, page, sort, query) => {
        return await ProductDao.get(limit, page, sort, query)
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

    remove = async(id) => {
        return await ProductDao.remove(id)
    }
}