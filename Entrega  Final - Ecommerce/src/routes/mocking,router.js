// En tu archivo de rutas (por ejemplo, routes/products.router.js)

import express from 'express';

const router = express.Router();

router.get('/mockingproducts', (req, res) => {
  const mockingProducts = generateMockingProducts();
  res.json(mockingProducts);
});

function generateMockingProducts() {
  const mockingProducts = [];

  for (let i = 1; i <= 100; i++) {
    mockingProducts.push({
      _id: i.toString(),
      name: `Product ${i}`,
      description: `Description for Product ${i}`,
      price: Math.random() * 100, // Precio aleatorio para fines de ejemplo
    });
  }

  return mockingProducts;
}

export default router;
