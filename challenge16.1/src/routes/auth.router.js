// auth.route.js
import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const result = await registerUser(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error in registration:', error);
    res.status(500).json({ message: 'Error in registration' });
  }
});

router.post('/login', async (req, res, next) => {
  try {
    await loginUser(req, res, next);
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ message: 'Error in login' });
  }
});

router.post('/logout', (req, res) => {
  try {
    logoutUser(req, res);
  } catch (error) {
    console.error('Error in logout:', error);
    res.status(500).json({ message: 'Error in logout' });
  }
});

export default router;
