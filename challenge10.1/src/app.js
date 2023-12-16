import express from 'express'
import config from './config/config.js'
import sessionRouter from './routes/session.router.js'
import { Server } from 'socket.io';
import productsRouter from './routes/product.router.js'
import cartsRouter from './routes/cart.router.js'
import ticketsRouter from './routes/tickets.router.js'
import initializePassport from './config/passport.config.js'
import passport from 'passport'
import session from 'express-session'
import handlebars from 'express-handlebars'
import __dirname from './utils.js';
import viewRouter from './routes/view.router.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'))


app.use(session({
    secret: 'secre6t',
    resave: true,
    saveUninitialized: true
}))

initializePassport()
app.use(passport.initialize())

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/tickets', ticketsRouter)
app.use('/session', sessionRouter)
app.use(viewRouter)

const httpServer = app.listen(8080, ()=> console.log('Servidor corriendo en el puerto 8080'));
const io = new Server(httpServer)

// Configurar socket del lado del servidor
io.on('connection', async(socket)=> {
    console.log(`Cliente nuevo conectado ${socket.id}`)

// recibe el producto y lo guarda (mongo)
    socket.on('new-product', async(newProduct)=> {
        try {
            const newProductCreated = await productMongo.addNewProducts(newProduct)
            io.emit('product-created', newProductCreated)
        } catch (error) {
            console.error(`Error al crear el producto ${error}`)
        }
    })

// Recibe el id del producto que quiere eliminar (mongo)
    socket.on('deleteProduct', async(productId)=> {
        try {
        await productMongo.deleteProduct(productId)
        io.emit('deleting-product', productId)
        } catch (error) {
            console.error(`Error al eliminar el producto ${error}`)
        }
    })
    

    // obtiene los mensjaes
    try {
        const messageData2 =  await messageManager.getAllMessagesChat()
        io.emit('messagesLogs', messageData2)
    } catch(error) {
        console.error('Error al obtener los mensajes')
    }

    // obtiene los mensajes nuevos de los clientes
    socket.on('message', async(data)=> {
        const {user, message} = data
        try {
            await messageManager.addNewMessage(user, message)
            const messageData = await messageManager.getAllMessagesChat()
            io.emit('messagesLogs', messageData)
        } catch (error) {
            console.error('Error al guardar el mensaje')
        }
    })
    
    
    io.emit('mensajeGeneral', 'Este es un mensaje para todos')
})


