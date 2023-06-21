const fs = require('fs')

class ProductManager{
    constructor(path){
        this.path = path
        this.loadFile().then(() => {
            console.log('Elementos cargados desde el archivo')
        })
    }
    async loadFile(){
        try{
            const data = fs.promises.readFile(this.path)
            this.product = JSON.parse(data)
            console.log(this.product)

        }catch(error){
            console.log('El producto no fue leido con exito')
            this.product = [];
            await fs.promises.writeFile(this.path, '[]')
            
        }
    }
}