import express from 'express';

import { 
    createRecipe, 
    displayAllRecipes, 
    displayOneRecipe, 
    updateRecipe, 
    deleteRecipe, 
    searchRecipe, 
    filtreCategoryRecipe, 
    filtreRegimeRecipe 
  } from '../controllers/recipeController.js';

import { verifyToken } from '../utils/verifyUser.js';



const router = express.Router();

///////////////////////////////////////////////////////////////////////////
// routes protégées avec verifyToken
///////////////////////////////////////////////////////////////////////////
router.post('/', verifyToken, createRecipe); //POST: http://localhost:3000/api/recipes/ 
router.get ('/', displayAllRecipes) //GET: http://localhost:3000/api/recipes/
router.get ('/displayOneRecipe/:id',  verifyToken, displayOneRecipe) //GET: http://localhost:3000/api/recipes/displayOneRecipe/66cc83a167d91d80563f7b25
router.post ('/updateRecipe/:id', verifyToken, updateRecipe) // POST: http://localhost:3000/api/recipes/updateRecipe/66def36e2f915a6f29010b79
router.delete ('/deleteRecipe/:id', verifyToken, deleteRecipe) // DELETE: http://localhost:3000/api/recipes/deleteRecipe/66def36e2f915a6f29010b79 

///////////////////////////////////////////////////////////////////////////
// Search et filtrer
///////////////////////////////////////////////////////////////////////////

router.get('/search/:query', verifyToken, searchRecipe); // GET http://localhost:3000/api/recipes/search/salade
router.get('/filter/category', verifyToken,filtreCategoryRecipe); // GET http://localhost:3000/api/recipes/filter/category?category=starter

router.get('/filter/regime', verifyToken,filtreRegimeRecipe); // GET http://localhost:3000/api/recipes/filter/regime?regime=balance

export default router;