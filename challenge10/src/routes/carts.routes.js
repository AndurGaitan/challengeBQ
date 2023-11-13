import { Router } from "express";
import CartManager from "../dao/fileSystem/controllers/controllers/CartManager.js";
import ProductManager from "../dao/fileSystem/controllers/controllers/ProductManager.js";
import { CartMongoManager } from "../dao/mongo/CartMongoManager.js";
import { cartService } from "../dao/mongo/Services/index.js";


// File sistema
// const productMongo = new ProductManager()
// const cartManager = new CartManager()



const router = Router()

// Mongo
// const cartMongo = new CartMongoManager()




// Metodos con Fs

//Post: Metodo para agregar un producto al carrito
// router.post('/:cid/product/:pid', async (req, res)=> {
//     const cartId = parseInt(req.params.cid)
//     const productId = parseInt(req.params.pid)

//     try {

//         const existingCart = await cartManager.getCartById(cartId)
//         if(!existingCart) {
//             res.status(404).json({error: `El carrito ${cartId} no existe`})
//             return;
//         }

//         const existingProduct = await productManager.getProductoById(productId)
//         if(!existingProduct){
//             res.status(404).json({error: `El producto ${productId} no existe`})
//             return;
//         }


//         cartManager.addProductToCart(cartId, productId)

//         const ProductInCart = await cartManager.getCartById(cartId) 
//         res.status(200).json({message: 'Producto agregado correctamente', ProductInCart })

//     } catch (error) {
//         console.error('Error al agregar los productos al carrito')
//         res.status(500).json({error: 'Error del servidor al agregar el producto'})
//     }
// })


// // Post: Crear un nuevo carrito
// router.post('/', async(req, res)=> {
//     try {
//         const newCart =  cartManager.createCart()
//         res.status(200).json({message: 'Carrito creado correctamente', newCart})
//     } catch (error) {
//         res.status(500).json({error: 'Error al crear el carrito'})
//     }
// })

// // Get: Obtener carrito por id

//     router.get('/:cid', async(req, res)=> {
//         try {
//             const cid = parseInt(req.params.cid)
//             const getCartId = await cartManager.getCartById(cid)
//             res.status(200).json({message: `Producto encontrado con id ${cid}`, cart: [getCartId]})

//         } catch (error) {
//             if(error instanceof Error){
//                 res.status(404).json({error: error.message})
//             } else {
//             res.status(500).json({error: 'Error al obtener el carrito'})
//             }
//         }
//     })

// // Delete:Eliminar carrito por id

// router.delete('/:cid', async(req, res)=> {
//     try {
//         const cid = parseInt(req.params.cid)
//         cartManager.deleteCart(cid)
//         res.status(200).json({message:  `El carrito ${cid} fue eliminado correctamente`})

//     } catch (error) {
//         if(error instanceof Error){
//             res.status(404).json({error: error.message})
//         } else {
//         res.status(500).json({error: 'Error al eliminar el carrito'})
//         }
//     }



    

// })




// Metodos con Mongo


router.get('/:cid', async(req,res)=> {
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
})

// Crear un carrito
router.post('/', async(req, res)=> {
    try {
        const newCart =  await cartService.createCart();
        res.status(201).json({
            status: 'Success',
            idCart: newCart._id})

    } catch (error) {
        if(error instanceof Error) {
            res.status(404).json({error: error.message})
        } else {
            res.status(500).json({error: 'Error al crear el carrito'})

        }
    }
})

// Eliminar el carrito (No usar por el momento)
// router.delete('/:cid', async(req,res)=> {
//     try {
//         const cid = req.params.cid
//         await cartMongo.deleteCart(cid)
//         res.status(200).json({
//             status: 'Success',
//             message: 'Carrito eliminado correctamente'})

//     } catch (error) {
//         if(error instanceof Error){
//             res.status(404).json({error: error.message})
//         } else {
//             res.status(500).json({error: 'Error al eliminar el carrito'})
//         }
//     }
// })


// Agregar productos al carrito


router.post('/:cid/products/:pid/', async(req, res)=> {
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
})


// Eliminar un producto del carrito

router.delete('/:cid/products/:pid', async(req, res)=> {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;

        await cartService.deleteProductFromCart(cid, pid)
        res.status(200).json({status: 'Succes', message: 'Producto eliminado correctamente'})

    } catch (error) {
        if(error instanceof Error){
            res.status(404).json({error: error.message})
        } else {
            res.status(500).json({error: 'Error al eliminar el producto seleccionado'})
        }
    }
})


router.delete('/:cid', async(req, res)=> {
    try {
        const cid = req.params.cid;
        await cartService.deleteAllProducts(cid)
        res.status(200).json({status: 'Succes', message: 'Se eliminaron todos los productos con exito'})
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({error: error.message})
        } else {
            res.status(500).json({error: 'Error al eliminar los productos del carrito'})
        }
    }
})



router.put('/:cid/products/:pid', async(req, res)=> {
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


})



router.put('/:cid', async(req,res)=> {
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
})
export {router as cartRouter};