// ingredientRoute.js
import express from 'express';
import {
    createIngredient,
  displayIngredients,
  updateIngredient,
  deleteIngredient,
  searchIngredientByName,
} from '../controllers/ingredientController.js';
//
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/', verifyToken, createIngredient); // POST http://localhost:3000/api/ingredients
router.get('/display',verifyToken, displayIngredients); // GET http://localhost:3000/api/ingredients/display
router.post('/update/:id',verifyToken, updateIngredient); // POST http://localhost:3000/api/ingredients/update/:id
router.delete('/delete/:id',verifyToken, deleteIngredient); // DELETE http://localhost:3000/api/ingredients/delete/:id
router.get('/search', verifyToken, searchIngredientByName); // GET http://localhost:3000/api/ingredients/search?name=Tomate
export default router;
