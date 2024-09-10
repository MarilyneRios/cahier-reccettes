import express from 'express';

import { createRecipe, displayAllRecipes } from '../controllers/recipeController.js';

import { verifyToken } from '../utils/verifyUser.js';



const router = express.Router();


// routes protégées avec verifyToken

router.post('/', verifyToken, createRecipe); //POST: http://localhost:3000/api/recipes/ 
router.get ('/displayAllRecipes', displayAllRecipes) //GET: http://localhost:3000/api/recipes/displayAllRecipes 

export default router;