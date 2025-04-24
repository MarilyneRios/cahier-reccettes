//userRoutes.js
import express from 'express';
import {display,  updateUser, deleteUser,resetPasswordUser
} from '../controllers/userController.js'
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/', display);
router.post('/update/:id', verifyToken, updateUser);
router.post('/resetPasswordUser/:id', verifyToken, resetPasswordUser);
router.delete('/delete/:id', verifyToken, deleteUser);

export default router;