import { Router } from express
import { getProducts, getProductById, createProduct, updateProduct, removeProduct } from '../controllers/product.controller.js'

const router = Router()

router.get('/', getProducts)
router.get('/:pid',getProductById)
router.post('/', createProduct)
router.put('/:pid', updateProduct)
router.delete('/:pid',removeProduct)

export default router