//userRoutes.js
import express from 'express';
import {display,  updateUser, deleteUser,resetPasswordUser
} from '../controllers/userController.js'
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/', display);

//modifier le profil
router.post('/update/:id', verifyToken, updateUser);

// lien pour reset password
router.post('/resetPassword', resetPasswordUser);

//effacer le compte
router.delete('/delete/:id', verifyToken, deleteUser);

export default router;