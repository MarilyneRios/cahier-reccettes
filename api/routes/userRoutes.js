import express from 'express';
import {display,  updateUser, deleteUser
} from '../controllers/userController.js'
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/', display);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);

export default router;