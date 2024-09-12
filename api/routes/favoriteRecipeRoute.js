import express from 'express';

import { 
    displayAllFavoriteRecipes, 
    displayOneFavoriteRecipe, 
    addFavoriteRecipe, 
    removeFavoriteRecipe, 
    searchFavoriteRecipe, 
    filtreCategoryFavoriteRecipe, 
    filtreRegimeFavoriteRecipe 
  } from '../controllers/favoriteRecipeController.js';

import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();


///////////////////////////////////////////////////////////////////////////
// routes protégées avec verifyToken
///////////////////////////////////////////////////////////////////////////

router.post('/', verifyToken, addFavoriteRecipe); //POST: http://localhost:3000/api/favoriteRecipes/ et body json {"recipeId": "66def6fd1b93afaf4ce11f1f"}
router.get('/all', verifyToken, displayAllFavoriteRecipes);//GET: http://localhost:3000/api/favoriteRecipes/all
router.get('/one/:id', verifyToken, displayOneFavoriteRecipe);  //GET: http://localhost:3000/api/favoriteRecipes/one/id
router.delete('/:id', verifyToken, removeFavoriteRecipe);// DELETE: http://localhost:3000/api/favoriteRecipes/id 


///////////////////////////////////////////////////////////////////////////
// Search
///////////////////////////////////////////////////////////////////////////

router.get('/search/:query', searchFavoriteRecipe); // GET http://localhost:3000/api/favoriteRecipes/search/salade


///////////////////////////////////////////////////////////////////////////
//filtrer
///////////////////////////////////////////////////////////////////////////

router.get('/filter/category', verifyToken,filtreCategoryFavoriteRecipe); // GET http://localhost:3000/api/favoriteRecipes/filter/category?category=starter
router.get('/filter/regime', verifyToken,filtreRegimeFavoriteRecipe); // GET http://localhost:3000/api/favoriteRecipes/filter/regime?regime=balance

export default router;