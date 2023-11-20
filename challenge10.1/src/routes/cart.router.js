import { Router } from express
import { getCartById, createCart,addProductToCart, removeProductFromCart, updateCart, updateCartProducts, removeAllProducts} from '../controllers/cart.controller.js'


const router = Router()
//Mostrar el carrito 
router.get('/:cid', getCartById)
//Crear el carrito 

router.post('/', createCart)

//Agregar productos al arreglo products del carrito seleccionado
router.post('/:cid/product/:pid', addProductToCart)

//Eliminar del carrito EL producto seleccionado POR ID
router.delete('/:cid/product/:pid', removeProductFromCart)

// //Actualizar el carrito con un arreglo de productos
router.put('/:cid', updateCart)

// //Actualizar solo la cantidad de productos pasadas por req.body
router.put('/:cid/product/:pid', updateCartProducts)

// //Eliminar TODOS los productos del carrito
router.delete('/:cid', removeAllProducts)

export default router