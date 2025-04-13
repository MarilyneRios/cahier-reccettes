import express from 'express';

import { 
   getAllFavoriteRecipes,
    addFavoriteRecipe, 
    removeFavoriteRecipe, 
    searchFavoriteRecipe, 
    filtreFavoriteRecipe
  } from '../controllers/favoriteRecipeController.js';

import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();


///////////////////////////////////////////////////////////////////////////
// routes protégées avec verifyToken
///////////////////////////////////////////////////////////////////////////

router.post('/add', verifyToken, addFavoriteRecipe); //POST: http://localhost:3000/api/favoriteRecipes/ et body json {"recipeId": "66def6fd1b93afaf4ce11f1f"}
//router.get('/all', verifyToken, displayAllFavoriteRecipes);//GET: http://localhost:3000/api/favoriteRecipes/all
router.get('/', verifyToken, getAllFavoriteRecipes);//GET: http://localhost:3000/api/favoriteRecipes/all
//router.get('/one/:id', verifyToken, displayOneFavoriteRecipe);  //GET: http://localhost:3000/api/favoriteRecipes/one/id
router.delete('/:id', verifyToken, removeFavoriteRecipe);// DELETE: http://localhost:3000/api/favoriteRecipes/recipeId 


///////////////////////////////////////////////////////////////////////////
// Search
///////////////////////////////////////////////////////////////////////////

router.get('/search',verifyToken, searchFavoriteRecipe); // GET http://localhost:3000/api/favoriteRecipes/search/salade


///////////////////////////////////////////////////////////////////////////
//filtrer
///////////////////////////////////////////////////////////////////////////

router.get('/filterFavorite',verifyToken,  filtreFavoriteRecipe); // GET http://localhost:3000/api/favoriteRecipes/filterFavorite?country=France&category=Desserts


export default router;