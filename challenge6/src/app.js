// src/app.js
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import connectDB from './dao/dbManager.js';
import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';
import __dirname from './utils.js';

// Configuración de variables de entorno
dotenv.config();

// Conexión a la base de datos
connectDB();

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
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// Carpeta pública
app.use(express.static(path.join(__dirname, 'public')));

// Puerto de escucha
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
