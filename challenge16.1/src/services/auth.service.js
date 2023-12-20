// auth.service.js
import bcrypt from 'bcrypt';
import UserModel from '../models/user.model.js';

export const registerUserService = async ({ email, password }) => {
  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    throw new Error('Email already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({ email, password: hashedPassword });
  await newUser.save();

  return { message: 'User registered successfully' };
};

// export const loginUserService = async (user) => {
//   return user;
// };

// export const logoutUserService = () => {

// };



// // auth.service.js
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import nodemailer from 'nodemailer';
// import bcryptConfig from '../config/bcrypt.config.js';
// import jwtConfig from '../config/jwt.config.js';
// import nodemailerConfig from '../config/nodemailer.config.js';

// const { saltRounds } = bcryptConfig;
// const { secret, expiresIn } = jwtConfig;

// const transporter = nodemailer.createTransport(nodemailerConfig);

// export const register = async (userData) => {
//   // Lógica de registro...
// };

// export const login = async (email, password) => {
//   // Lógica de inicio de sesión...
// };

// export const logout = async () => {
//   // Lógica de cierre de sesión...
// };

// export const sendPasswordResetEmail = async (email) => {
//   try {
//     // Lógica para verificar que el correo electrónico existe en la base de datos

//     // Generar un token con expiración de 1 hora
//     const token = jwt.sign({ email }, secret, { expiresIn: '1h' });

//     // Crear el enlace de restablecimiento de contraseña
//     const resetLink = `http://tu-sitio.com/reset-password?token=${token}`;

//     // Configurar el correo electrónico
//     const mailOptions = {
//       from: 'tucorreo@gmail.com',
//       to: email,
//       subject: 'Restablecimiento de contraseña',
//       html: `Para restablecer tu contraseña, haz clic en el siguiente enlace: <a href="${resetLink}">${resetLink}</a>`,
//     };

//     // Enviar el correo electrónico
//     await transporter.sendMail(mailOptions);
//   } catch (error) {
//     throw error;
//   }
// };
