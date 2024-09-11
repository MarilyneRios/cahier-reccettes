import express from 'express';

import {  } from '../controllers/recipeController.js';

import { verifyToken } from '../utils/verifyUser.js';



const router = express.Router();


// routes protégées avec verifyToken

router.post('/', verifyToken, ); //POST: http://localhost:3000/api/recipes/ 
router.get ('/', verifyToken) //GET: http://localhost:3000/api/recipes/displayAllRecipes 
router.get ('//:id',  verifyToken,) //GET: http://localhost:3000/api/recipes/displayOneRecipe/66cc83a167d91d80563f7b25
router.post ('//:id', verifyToken, ) // POST: http://localhost:3000/api/recipes/updateRecipe/66def36e2f915a6f29010b79
router.delete ('//:id', verifyToken, ) // DELETE: http://localhost:3000/api/recipes/deleteRecipe/66def36e2f915a6f29010b79 



export default router;