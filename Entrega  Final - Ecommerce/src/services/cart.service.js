import { Cart } from '../DAO/factory.js'

const CartDao = new Cart()

export default class CartService{

getCartById = async(cid) => {
    return await CartDao.getById(cid)
}

createCart = async(userId) => {
    return await CartDao.createCart(userId)
}

addProductToCart = async(cid, pid) => {
    return await CartDao.addProductToCart(cid, pid)
}

removeProductFromCart = async(cid, pid) => {
    return await CartDao.removeProductFromCart(cid, pid)
}

updateCart = async(cid, updateProducts) => {
    return await CartDao.updateCart(cid, updateProducts)
}

updateProductQuantityInCart = async(cid, pid, quantity) => {
    return await CartDao.updateProductQuantityInCart(cid, pid, quantity)
}

removeAllProducts = async(cid) => {
    return await CartDao.removeAllProducts(cid)

}

}