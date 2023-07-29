const fs = require('fs').promises

class ProductManager{
    constructor(filePath){
        this.filePath = filePath
        this.products = []
        this.loadProduct();
    }

    async loadProduct(){
        try{
        const data = await fs.readFile(this.filePath, 'utf-8')
        this.products = JSON.parse(data)
        console.log(this.products)
        }catch(error){
            console.log('error')
        } 
    }

    async saveProduct(){
        try{
            const data = this.products
            
        }
    }
}

const manager = new ProductManager('./productos.json')

