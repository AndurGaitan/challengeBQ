import express from 'express'
import handlebars from 'express-handlebars'
import productsRouter from './routes/product.router.js'
import cartsRouter from './routes/cart.router.js'
import sessionRouter from './routes/session.router.js'
import viewRouter from './routes/views.router.js'
import __dirname from './utils.js'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import passport from 'passport'
import viewsRouter from './routes/views.router.js'
import initializePassport from './config/passport.config.js'
import jwtRouter from './routes/jwt.router.js'
import session from 'express-session'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'


const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/static', express.static( __dirname + '/public'))
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use(session({
    secret: 'secret',
    resave:true,
    saveUninitialized: true
}))

app.use(cookieParser());
app.use(passport.initialize())
initializePassport()

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/', sessionRouter)
//app.use('/jwt', jwtRouter)
app.use(viewsRouter)

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentacion de Ecommerce-MyShoes',
            description: 'Ecommerce de zapatillas'
        }
    },
    apis: [`${__dirname}/./docs/**/*.yaml`]
}

// Configuración de Swagger
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.listen(8080, () => {
    console.log('Servidor escuchando en el puerto 8080')
})