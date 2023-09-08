import { Router } from 'express'
import cartModel from '../dao/mongo/models/cart.model.js'
const router = Router()


router.get('/', async (req, res) => {
    const result = await cartModel.find()
    res.send(result)
})

router.get('/:idc/:idp', async (req, res) => {
    const idc = parseInt(req.params.idc)
    const idp = parseInt(req.params.idp)
    const quantity = req.query.quantity || 5
    const cart = await cartModel.findById(idc)
    cart.products.push({id:idp, quantity })
    const result = cart.save()
    res.send(result)
})

router.get('/:cid', async (req, res) => { 
    const cartId = req.params.cid;

    try {
        const cart = await cartMongo.getCartById(cartId).populate('products');
        res.status(200).json({ status: 'success', cart });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el carrito' });
    }
    }); 

router.post('/', async (req, res) => {
    const result = await cartModel.create({products: []})
    res.send(result)
})

// DELETE para eliminar un producto del carrito 
router.delete('/:cid/products/:pid', async (req, res) => { 
    const cartId = req.params.cid; 
    const productId = req.params.pid;

try {
    await cartMongo.removeProductFromCart(cartId, productId);
    res.status(200).json({ message: 'Producto eliminado del carrito correctamente' });
} catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto del carrito' });
}
});

// PUT para actualizar el carrito con un arreglo de productos 
router.put('/:cid', async (req, res) => { 
    const cartId = req.params.cid; 
    const products = req.body.products;

try {
    await cartMongo.updateCart(cartId, products);
    res.status(200).json({ message: 'Carrito actualizado correctamente' });
} catch (error) {
    res.status(500).json({ error: 'Error al actualizar el carrito' });
}
});

// PUT para actualizar la cantidad de un producto en el carrito 
router.put('/:cid/products/:pid', async (req, res) => { 
    const cartId = req.params.cid; 
    const productId = req.params.pid; 
    const quantity = parseInt(req.body.quantity);

try {
    await cartMongo.updateProductQuantity(cartId, productId, quantity);
    res.status(200).json({ message: 'Cantidad de producto actualizada en el carrito correctamente' });
} catch (error) {
    res.status(500).json({ error: 'Error al actualizar la cantidad del producto en el carrito' });
}
});

// DELETE para eliminar todos los productos del carrito 
router.delete('/:cid', async (req, res) => { 
    const cartId = req.params.cid;

try {
    await cartMongo.removeAllProductsFromCart(cartId);
    res.status(200).json({ message: 'Todos los productos fueron eliminados del carrito' });
} catch (error) {
    res.status(500).json({ error: 'Error al eliminar los productos del carrito' });
}
});

export default router