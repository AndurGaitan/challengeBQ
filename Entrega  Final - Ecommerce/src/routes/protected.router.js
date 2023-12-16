// protected.router.js
import express from 'express';
import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwt.config.js';

const router = express.Router();
const { secret } = jwtConfig;

// Middleware para verificar el token y el rol del usuario
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ error: 'Token no proporcionado' });

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });

    req.user = user;
    next();
  });
};

// Ruta protegida para usuarios estándar
router.get('/user', authenticateToken, (req, res) => {
  if (req.user.role === 'user' || req.user.role === 'premium') {
    res.json({ message: 'Acceso permitido para usuarios' });
  } else {
    res.status(403).json({ error: 'Acceso no autorizado' });
  }
});

// Ruta protegida para administradores
router.get('/admin', authenticateToken, (req, res) => {
  if (req.user.role === 'admin') {
    res.json({ message: 'Acceso permitido para administradores' });
  } else {
    res.status(403).json({ error: 'Acceso no autorizado' });
  }
});

export default router;
