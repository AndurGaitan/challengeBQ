const fs = require('fs')

class ProductManager {
  // Constructor que inicializa el arreglo de productos
  constructor(path) {
    this.path = path;
    this.cargarDesdeFs().then(() => {
      console.log('Productos guardados desde fs')
    })
  }

  async cargarDesdeFs() {
    try {
      const data = fs.promises.readFile(this.path)
      const conData = JSON.parse(data)
      this.products = conData
    } catch (error) {
      console.log('Hubo un error al cargar los productos')
      this.products = []
      await fs.promises.writeFile(this.path, '[]')
    }
  }

  async guardarEnFs() {
    try {
      const data = JSON.stringify(this.products);
      await fs.promises.writeFile(this.path, data)
    } catch (error) {
      console.log('Se produjo un error al guardar los productos en la DB')
    }
  }

  async addProduct(){
    if(!product || !product.title || !product.price || !product.code || !product.description){
      console.log('Faltan datos del producto')
      return;
    }

    const lastProduct = this.products[this.products.length - 1] ;
    let nextId = 1
    if(lastProduct){
      nextId = lastProduct.id + 1
    }

    const newProduct = {id: nextId, ...product}

    this.products.push(newProduct);

    await this.guardarEnFs();

    console.log('Se agregado el siguiente producto:', newProduct)

  }

  getProducts(){
    return this.products() || []
  }

}

const manager = new ProductManager("./productos.json")

async function ejecutar(){
  
  await manager.cargarDesdeFs()

  manager.addProduct({
    title: "Producto 1",
    description: "Descripción del producto 1",
    price: 99.9,
    thumbnail: "thumbnail1.jpg",
    code: "PRD001",
    stock: 10,
  });
}

ejecutar()







