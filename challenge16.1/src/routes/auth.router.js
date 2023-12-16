import {Router} from 'express';
import { sendPasswordResetEmail } from '../services/auth.service.js';
import { register, login, logout } from '../services/auth.service.js';
const router = Router();

router.post('/register', async (req, res) => {
  try {
    await register(req.body);
    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await login(email, password);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Credenciales incorrectas' });
  }
});

router.post('/logout', async (req, res) => {
  try {
    await logout();
    res.status(200).json({ message: 'Cierre de sesión exitoso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al cerrar la sesión' });
  }
});

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    // Verificar si el correo electrónico existe en la base de datos (lógica específica de tu aplicación)
    const userExists = true; // Reemplazar con tu lógica de verificación de usuario

    if (userExists) {
      await sendPasswordResetEmail(email);
      res.status(200).json({ message: 'Correo electrónico de restablecimiento enviado con éxito' });
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al enviar el correo electrónico de restablecimiento' });
  }
});

export default router;

export const checkRole = (role) => {
    return (req, res, next) => {
      if (req.isAuthenticated() && req.user.roles === role) {
        return next();
      }
      res.status(403).json({ error: 'Acceso no autorizado' });
    };
  }