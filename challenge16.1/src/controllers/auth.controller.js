// auth.controller.js
import passport from 'passport';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/user.model.js';
import { secretKey } from '../config.js';

export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({ email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error in registration:', error);
    return res.status(500).json({ message: 'Error in registration' });
  }
};

export const loginUser = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    req.login(user, { session: false }, async (err) => {
      if (err) {
        return next(err);
      }

      const token = jwt.sign({ sub: user._id }, secretKey);
      return res.json({ token });
    });
  })(req, res, next);
};

// export const logoutUser = (req, res) => {
//   req.logout();
//   return res.json({ message: 'User logged out successfully' });
// };
