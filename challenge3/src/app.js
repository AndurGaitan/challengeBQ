import express from 'express';
import ProductManager from './productManager.js'

const app = express()
const productManager = new ProductManager('products.json')

app.get('/product', async (req, res) => {
    try {
      const products = await productManager.getAllProducts();
      res.json(products);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      res.status(500).json({ error: 'Ocurrió un error al obtener los productos.' });
    }
  });

app.get('/product/:pid', async (req, res) => {
    try {
        const product = await productManager.getProductById(req.params.pid);
        res.json(product);
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).json({ error: 'Ocurrión un error al obtener el producto.' });
    }

})

app.listen(8080, () => {
    console.log('Server is running on port 8080')
})