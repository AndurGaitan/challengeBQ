const fs = require('fs').promises;

class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
    this.products = [];
    this.loadProducts();
  }

  async loadProducts() {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
      this.products = JSON.parse(data);
    } catch (err) {
      console.error('Error al cargar los productos:', err);
    }
  }

  async saveProducts() {
    try {
      const data = JSON.stringify(this.products, null, 2);
      await fs.writeFile(this.filePath, data, 'utf8');
    } catch (err) {
      console.error('Error al guardar los productos:', err);
    }
  }

  generateProductId() {
    const lastProduct = this.products[this.products.length - 1];
    return lastProduct ? lastProduct.id + 1 : 1;
  }

  async addProduct(product) {
    const productId = this.generateProductId();
    const productWithId = { ...product, id: productId };
    this.products.push(productWithId);
    await this.saveProducts();
  }

  async updateProduct(productId, updatedProduct) {
    const index = this.products.findIndex((product) => product.id === productId);
    if (index !== -1) {
      this.products[index] = { ...updatedProduct, id: productId };
      await this.saveProducts();
    } else {
      console.error('El producto con el ID especificado no existe.');
    }
  }

  async removeProduct(productId) {
    this.products = this.products.filter((product) => product.id !== productId);
    await this.saveProducts();
  }

  getProductById(productId) {
    return this.products.find((product) => product.id === productId);
  }

  getAllProducts() {
    return this.products;
  }
}


// Ejecucion

(async () => {
  const productManager = new ProductManager('productos.json');
  await productManager.addProduct({ title: 'Nike', description: 'zapatillas', price: '15200', thumbnail: 'https://cdn3.iconfinder.com/data/icons/sport-and-fitness-2/512/nike-512.png', code: '1234', stock: '50' });
  await productManager.addProduct({ title: 'Adidas', description: 'zapatillas adidas', price: '16200', thumbnail: 'https://cdn3.iconfinder.com/data/icons/sport-and-fitness-2/512/adidas-512.png', code: '1235', stock: '50' })
  console.log(productManager.getAllProducts());
  const product = productManager.getProductById(2);
  console.log(product);
  await productManager.removeProduct(1);
  console.log(productManager.getAllProducts());
})();