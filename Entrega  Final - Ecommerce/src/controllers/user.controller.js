import UserModel from '../DAO/mongo/models/user.model.js'
import nodemailer from 'nodemailer';
import config from "../config/config.js";

export const getAllUsers = async (req, res) => {
    try {
      const users = await UserModel.find();
      res.status(200).json({ status: 'success', users });
    } catch (error) {
      res.status(500).json({ status: 'error', error: 'Error al obtener los usuarios' });
    }
  };

export const deleteInactiveUsers = async (req, res) => {
    try {
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  
      const inactiveUsers = await UserModel.find({ lastLogin: { $lt: twoDaysAgo } });
  
      await UserModel.deleteMany({ lastLogin: { $lt: twoDaysAgo } });
  
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user: config.gmailKey,
            pass: config.gmail
        }
    
      });
  
      inactiveUsers.forEach(async (user) => {
        const mailOptions = {
          to: user.email,
          subject: 'Cuenta eliminada por inactividad',
          text: 'Tu cuenta ha sido eliminada por inactividad durante los últimos 2 días.',
        };
  
        await transporter.sendMail(mailOptions);
      });
  
      res.status(200).json({ status: 'success', message: 'Usuarios inactivos eliminados' });
    } catch (error) {
      res.status(500).json({ status: 'error', error: 'Error al eliminar usuarios inactivos' });
  }
};