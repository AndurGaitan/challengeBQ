class ProductManager{
    constructor(){
        this.product=[]
    }

    getProduct(){
        return this.product
    }

    getNextId = () => {
        const count = this.product.length
        const nextID = (count > 0) ? this.product[count -1].code + 1 : 1 
        return nextID
    }

    addProduct(title, description, price, thumbnail, stock){
        const productIn = {
            code: this.getNextId(),
            title,
            description,
            price,
            thumbnail,
            stock
        }

        this.product.push(productIn)
    }

    getProductById(code){
        return this.product.find(find => find.code == code)
    }

}

const manager = new ProductManager()
manager.addProduct('manzana','fruta',60,'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fes%2Ffotos%2Fmanzana&psig=AOvVaw1PY2uEyIK20iY1bPXiBIec&ust=1686220374187000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCLiC_8f6sP8CFQAAAAAdAAAAABAE',10)
manager.addProduct('pera','fruta',40,'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fes%2Ffotos%2Fmanzana&psig=AOvVaw1PY2uEyIK20iY1bPXiBIec&ust=1686220374187000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCLiC_8f6sP8CFQAAAAAdAAAAABAE',10)
manager.addProduct('banana','fruta',80,'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fes%2Ffotos%2Fmanzana&psig=AOvVaw1PY2uEyIK20iY1bPXiBIec&ust=1686220374187000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCLiC_8f6sP8CFQAAAAAdAAAAABAE',10)

console.log(manager.getProduct())
console.log('-------------------------------')
console.log(manager.getProductById(2))

