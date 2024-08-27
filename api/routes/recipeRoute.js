import express from 'express';
import { createRecipe } from '../controllers/recipeController.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();


// routes protégées avec verifyToken
// POST request pour /api/recipes pour créer une nouvelle recette
router.post('/', verifyToken, createRecipe); //POST: http://localhost:3000/api/recipes/ 

export default router;