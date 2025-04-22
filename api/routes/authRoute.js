
import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';

import { display, signin, signup,google, signout } from '../controllers/authControllers.js';

const router = express.Router();

router.get('/', display);

router.post('/signup', signup);

router.post('/signin', signin);

router.post('/signout', signout);

router.post('/google', google);

export default router;