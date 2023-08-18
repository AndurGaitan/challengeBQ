import handlebars from 'express-handlebars'
import express from 'express';
import path from 'path';
import mongoose from 'mongoose'
import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';
import __dirname from './utils.js';

// Creación del servidor
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

// Middleware para manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Vista principal
app.get('/', (req, res) => {
  res.render('home');
});

// Vista para el chat
app.get('/chat', (req, res) => {
  res.render('chat');
});

// Configuración del motor de plantillas Handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

// Carpeta pública
app.use(express.static(path.join(__dirname, 'public')));

// Puerto de escucha
const MONGODB_URI = 'mongodb+srv://adminEcommerce:2Whn48RR66OEm8gv@cluster0.jwe0tnc.mongodb.net/';
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {dbName: 'clase09'})
        .then(()=> console.log('DBconected'))
        .then(() => app.listen(8080, () => console.log('Listening')))
    console.log('Conexión a la base de datos establecida');
  } catch (error) {
    console.error('Error de conexión a la base de datos:', error);
  }
};

connectDB()



