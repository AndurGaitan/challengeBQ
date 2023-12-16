import CartService from '../services/cart.services.js'
import ProductService from "../services/product.services.js";
import logger from '../logger/logger.js'

const productService = new ProductService()

const cartService = new CartService()

export const getCartById = async(req, res) => {
    try {
        const cid = req.params.cid
        const getCartId = await cartService.getCartById(cid)

        if(!getCartId){
            res.status(404).json({error: 'Carrito no encontrado'})
        }

        console.log(getCartId)

        res.status(200).json({
            status: 'Success',
            getCartId
        })

        console.log(getCartId)

    } catch (error) {
        if(error instanceof Error){
            res.status(404).json({error: error.message})
        } else{
            res.status(500).json({error: 'Error al buscar el carrito'})
        }
    }
}

export const createCart = async(req, res) => {
    try {
        const newCart =  await cartService.createCart();
        logger.info('Carrito creado con exito');
        res.status(201).json({
            status: 'Success',
            idCart: newCart._id})

    } catch (error) {
        logger.error(`Error en cartService.createCart: ${error.message}`)
        if(error instanceof Error) {
            res.status(404).json({error: error.message})
        } else {
            res.status(500).json({error: 'Error al crear el carrito'})

        }
    }
}

export const addProductToCart = async(req, res) => {
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        const updateCart = await cartService.addProductToCart(cid, pid)

        res.status(200).json({
            status: 'Success',
            message: 'Producto agregado al carrito correctamente',
            cart: updateCart
        })

    } catch (error) {
        if(error instanceof Error){
            res.status(404).json({error: error.message})
        } else {
            res.status(500).json({error: 'Error al agregar el producto'})
        }
    }
}

export const removeProductFromCart = async(req, res)=> {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;

        await cartService.removeProductFromCart(cid, pid)
        res.status(200).json({status: 'Succes', message: 'Producto eliminado correctamente'})

    } catch (error) {
        if(error instanceof Error){
            res.status(404).json({error: error.message})
        } else {
            res.status(500).json({error: 'Error al eliminar el producto seleccionado'})
        }
    }
}

export const updateCart = async(req, res) => {
    try {
        const cid = req.params.cid;
        const updateProducts = req.body;

        const updateCart = await cartService.updateCart(cid, updateProducts);
        res.status(200).json({message: `Carrito ${cid} se actualizo correctament`, updateCart});

    } catch (error) {
        if(error instanceof Error) {
            res.status(404).json({error: error.message});
        } else {
            res.status(500).json({error: 'Error al actualizar el carrito'});
        }
    }

}

export const updateCartProducts = async(req, res) => {
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        const quantity = parseInt(req.body.quantity);  

        const updateProductCart = await cartService.updateProductQuantityInCart(cid, pid, quantity)

        res.status(200).json({message: `Producto ${pid} actualizado correctamente`, updateProductCart})
    } catch (error) {
        if(error instanceof Error) {
            res.status(404).json({error: error.message})

        } else {
            res.status(500).json({error: 'Error al actualizar la cantidad del producto'})
        }
    }
}

export const removeAllProducts = async(req, res) => {
    try {
        const cid = req.params.cid;
        await cartService.removeAllProducts(cid)
        res.status(200).json({status: 'Succes', message: 'Se eliminaron todos los productos con exito'})
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({error: error.message})
        } else {
            res.status(500).json({error: 'Error al eliminar los productos del carrito'})
        }
    }

}



