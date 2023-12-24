import { Router } from 'express'
import { getCartById, createCart,addProductToCart, removeProductFromCart, updateCart, updateCartProducts, removeAllProducts} from '../controllers/cart.controller.js'


const router = Router()

router.get('/:cid', getCartById)

router.post('/:uid', createCart)

router.post('/:cid/product/:pid', addProductToCart)

router.delete('/:cid/product/:pid', removeProductFromCart)

router.put('/:cid', updateCart)

router.put('/:cid/product/:pid', updateCartProducts)

router.delete('/:cid', removeAllProducts)

export default router