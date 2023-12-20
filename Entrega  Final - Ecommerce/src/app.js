import express from 'express'
import productsRouter from './routes/product.router.js'

const app = express()

app.use('/api/products', productsRouter)

app.listen(8080, () => {
    console.log('Servidor escuchando en el puerto 8080')
})