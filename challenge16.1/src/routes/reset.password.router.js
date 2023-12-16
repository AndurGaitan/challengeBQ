// reset-password.router.js
import {Router} from 'express';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Verificar y decodificar el token
    const decodedToken = jwt.verify(token, 'tu_secreto');

    // Lógica para restablecer la contraseña (actualizar en la base de datos, por ejemplo)
    // ...

    res.status(200).json({ message: 'Contraseña restablecida con éxito' });
  } catch (error) {
    console.error(error);

    if (error.name === 'TokenExpiredError') {
      res.status(400).json({ error: 'El enlace ha caducado, solicita uno nuevo' });
    } else {
      res.status(500).json({ error: 'Error al restablecer la contraseña' });
    }
  }
});

export default router;
