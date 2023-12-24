// users.router.js
import {Router} from 'express';
import { getAllUsers, deleteInactiveUsers } from '../controllers/user.controller.js';

const router = Router();

router.get('/', getAllUsers);

router.delete('/', deleteInactiveUsers);

export default router;