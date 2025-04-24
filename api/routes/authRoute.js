
import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';

import { display, signin, signup,google, signout, getUserByEmail, verifyReponseSecret } from '../controllers/authControllers.js';

const router = express.Router();

//test route
router.get('/', display);

//inscription
router.post('/signup', signup);

//connexion
router.post('/signin', signin);
router.post('/google', google);

//déconnoxion
router.post('/signout', signout);

//Vérification d'email
router.get("/getUserByEmail", getUserByEmail);

//Comaprer les reponseSecrete
router.post("/verifyReponseSecret", verifyReponseSecret);

export default router;