// auth.service.js
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import nodemailerConfig from '../config/nodemailer.config.js';
import bcryptConfig from '../config/bcrypt.config.js';
import jwtConfig from '../config/jwt.config.js';
import bcrypt from 'bcrypt';

const { saltRounds } = bcryptConfig;
const { secret, expiresIn } = jwtConfig;

export const register = async (userData) => {
  try {
    // Lógica para registrar un nuevo usuario en la base de datos (por ejemplo, MongoDB)

    // Hasheo de la contraseña antes de almacenarla
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    // Almacenar el usuario en la base de datos con la contraseña hasheada
    // ...

    return { message: 'Usuario registrado con éxito' };
  } catch (error) {
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    // Lógica para verificar el usuario en la base de datos (por ejemplo, MongoDB)

    // Comparar la contraseña hasheada almacenada con la contraseña proporcionada
    const passwordMatch = await bcrypt.compare(password, hashedPasswordFromDatabase);

    if (passwordMatch) {
      // Generar un token JWT si las credenciales son válidas
      const token = jwt.sign({ email }, secret, { expiresIn });

      return { message: 'Inicio de sesión exitoso', token };
    } else {
      throw { message: 'Credenciales incorrectas' };
    }
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  // Lógica para cerrar la sesión (si es necesario)
};

const transporter = nodemailer.createTransport(nodemailerConfig);

export const sendPasswordResetEmail = async (email) => {
  // Generar un token con expiración de 1 hora
  const token = jwt.sign({ email }, 'tu_secreto', { expiresIn: '1h' });

  // Crear el enlace de restablecimiento de contraseña
  const resetLink = `http://tu-sitio.com/reset-password?token=${token}`;

  // Configurar el correo electrónico
  const mailOptions = {
    from: 'tucorreo@gmail.com',
    to: email,
    subject: 'Restablecimiento de contraseña',
    html: `Para restablecer tu contraseña, haz clic en el siguiente enlace: <a href="${resetLink}">${resetLink}</a>`,
  };

  // Enviar el correo electrónico
  await transporter.sendMail(mailOptions);
};
