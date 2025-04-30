
import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { sendResetEmail } from "../utils/emailService.js";

import { display, 
    signin, 
    signup,
    google, 
    signout, 
    getUserByEmail, 
    verifyReponseSecret,
    resetPasswordRequest,
} from '../controllers/authControllers.js';

const router = express.Router();

//test route
router.get('/', display);

//inscription
router.post('/signup', signup);

//connexion
router.post('/signin', signin);
router.post('/google', google);

//déconnexion
router.post('/signout', signout);

//Vérification d'email
router.get("/getUserByEmail", getUserByEmail);

//Comaprer les reponseSecrete
router.post("/verifyReponseSecret", verifyReponseSecret);

//pour envoyer le mail avec un lien pour resetPassword
router.post('/sendResetEmail', resetPasswordRequest); 



export default router;