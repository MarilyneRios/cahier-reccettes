import express from 'express';

import { 
    displayAllFavoriteRecipes, 
    displayOneFavoriteRecipe, 
    addFavoriteRecipe, 
    removeFavoriteRecipe, 
    searchRecipe, 
    filtreCategoryRecipe, 
    filtreRegimeRecipe 
  } from '../controllers/recipeController.js';

import { verifyToken } from '../utils/verifyUser.js';



const router = express.Router();


// routes protégées avec verifyToken

router.post('/', verifyToken, addFavoriteRecipe); //POST: http://localhost:3000/api/favoriteRecipes/ 
router.get('/all', verifyToken, displayAllFavoriteRecipes);//GET: http://localhost:3000/api/favoriteRecipes/all
router.get('/one/:id', verifyToken, displayOneFavoriteRecipe);  //GET: http://localhost:3000/api/favoriteRecipes/one/id
router.delete('/:id', verifyToken, removeFavoriteRecipe);// DELETE: http://localhost:3000/api/favoriteRecipes/id 

///////////////////////////////////////////////////////////////////////////
// Search et filtrer
///////////////////////////////////////////////////////////////////////////

router.get('/search', verifyToken, searchRecipe); // GET http://localhost:3000/api/favoriteRecipes/search
router.get('/filter/category', verifyToken,filtreCategoryRecipe); // GET http://localhost:3000/api/favoriteRecipes/filterCategoryRecipe
router.get('/filter/regime', verifyToken,filtreRegimeRecipe); // GET http://localhost:3000/api/favoriteRecipes/filtreRegimeRecipe

export default router;