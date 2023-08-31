import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import productRouter from './routes/product.router.js'
import cartRouter from './routes/cart.router.js'
import viewsRouter from './routes/views.router.js'
import __dirname from './utils.js'
import ProductManager from './dao/fileMananger/product.manager.js'
import mongoose from 'mongoose'
import UserModel from './dao/mongoManager/models/user.model.js'


const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')


app.use('/', viewsRouter)
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)

const uri = 'mongodb+srv://adminEcommerce:2Whn48RR66OEm8gv@cluster0.jwe0tnc.mongodb.net/?retryWrites=true&w=majority'
const dbName = 'ecommercePruebaRealTime'

mongoose.connect(uri, {dbName})
     .then(() => {
        console.log('DB CONNECTED')
        const httpServer = app.listen(3000, () => {console.log('servidor escuchando en el puerto 8080')})
        const io = new Server(httpServer)

        io.on('connection', socket => {
          socket.on('new-product',async data => {
          const productManager = new ProductManager()
          await productManager.create(data)

          const products = await productManager.list()
          io.emit('reload-form', products)
          console.log(data)
    })
})
     })
     .catch(e => console.log(e))

