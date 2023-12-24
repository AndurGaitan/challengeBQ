import CartModel from './models/cart.model.js'
import ProductModel from './models/products.model.js'

export default class Cart {
    getById = async (idCart) => {
        try {
            const cart = await CartModel.findById(idCart)

            if(cart){
            const mongoProduct = cart.products = cart.products.map(item=> ({
                    product: {
                        _id: item.product._id,
                        title: item.product.title,
                        description: item.product.description,
                        price: item.product.price,
                        thumbnails: item.product.thumbnails,
                        code: item.product.code,
                        stock: item.product.stock,
                        status: item.product.status,
                        category: item.product.category,
                    },
                    quantity: item.quantity,
                }))
                return {
                    _id: cart._id,
                    products: mongoProduct,
                }
            }


            return null

        } catch (error) {
            throw new Error(`Error al obtener el carrito ${idCart} ${error.message}`)
        }
    }

    createCart = async(userId) => {
        try {
            const newCart = new CartModel({user: {_id:userId},products: []})
            const savedCart = await newCart.save();
            return savedCart;
        } catch (error) {
            throw new Error(`Error al crear el carrito ${error.message}`)
        }
    }

    addProductToCart = async(idCart, idProduct) => {
        try {

            const cart = await CartModel.findById(idCart)
            if(!cart) throw new Error(`Carrito ${idCart} no encontrado`)

            const product = await ProductModel.findById(idProduct)
            if(!product) throw new Error(`Producto ${idProduct} no encontrado `)

            const existignProductIndex = cart.products.findIndex(item=> item.product.equals(idProduct))
            if(existignProductIndex !== -1){
                cart.products[existignProductIndex].quantity +=1;
            } else {
                cart.products.push({product: idProduct, quantity: 1})
            }

            await cart.save();

            const cartId = cart.toObject()
            delete cartId._id;
            
            return cart
        } catch (error) {
            throw new Error(`Error al guardar el producto ${error.message}`)
        }
    }
    

    removeProductFromCart = async (cid, pid) => {
        try {

            const cart = await CartModel.findById(cid)
            if(!cart) {
                throw new Error(`Carrito ${cart} no encontrado`)
            }

            const productIndex =  cart.products.findIndex(item => item.product.equals(pid));
            if(productIndex === -1){
                throw new Error(`Producto ${pid} no encontrado en el carrito`)
            }
            
            cart.products.splice(productIndex, 1)
            await cart.save()
            return cart;

        } catch (error) {
            throw new Error(`Error al eliminar el producto ${error.message}`)
        }
    }

    updateCart = async(cartid, updateProductsCart) => {
        try {

            const cart = await CartModel.findById(cartid);
            if(!cart) {
                throw new Error(`El carrito ${cartid} no existe`);
            }

            cart.products = updateProductsCart;
            await cart.save();
            return cart

        } catch (error) {
            throw new Error(`Error al actualizar el carrito ${error.message}`);
        }

    }

    updateProductQuantityInCart = async(cartId, productId, newQuantity) => {
        try {
            const cart = await CartModel.findById(cartId);
            if (!cart) {
                throw new Error(`El carrito ${cartId} no existe`);
            }
            
            const productIndex = cart.products.findIndex(item => item.product.equals(productId));
            if (productIndex !== -1) {
                cart.products[productIndex].quantity = newQuantity;
                await cart.save();
                return cart;
            } else {
                throw new Error(`El producto ${productId} no existe`);
            }    
        } catch (error) {         
            throw new Error(`Error al actualizar la cantidad del producto ${error.message}`);
        }

    }

    removeAllProducts = async(cid) => {
        try {
            const cart = await CartModel.findById(cid)
            if(!cart) {
                throw new Error(`El carrito ${cid} no existe`)
            }
            cart.products = [];

            await cart.save();
            return cart

        } catch (error) {
            throw new Error(`Error al eliminar los productos ${error.message}`)
        }
    }

}