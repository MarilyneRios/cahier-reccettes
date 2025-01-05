import mongoose from 'mongoose';
import Recipe from '../models/recipeModel.js';
import User from '../models/userModel.js';
import { errorHandler } from '../utils/error.js';
import { verifyToken } from '../utils/verifyUser.js';

//test
export const display = (req, res) => {
  res.json({
    message: 'hello world on api/reicpeRoutes and repiceController ok',
  });
};

///////////////////////////////////////////////////////////////////////////
// recipes
///////////////////////////////////////////////////////////////////////////

// @desc    create 1 recipe && signIn
// @route   POST /api/recipes
// @access  Private (token)
export const createRecipe = async (req, res, next) => {
  // Extraire le userId depuis req.user 
  const userId = req.user.id; 
  // Récupérer le body du front
  const {
    name,
    country,
    category,
    regime,
    makingTime,
    cookingTime,
    imageUrl,
    instructions,
    ingredients, // Liste des ingrédients avec leurs quantités et unités
    comments,
    pseudo,

  } = req.body;

  // Validation des champs
  if (!name || !country || !category || !regime || !ingredients || !instructions || !userId) {
    return res.status(400).json({ message: 'Tous les champs requis doivent être remplis, y compris userId.' });
  }

  // Créer la nouvelle recette
  const newRecipe = new Recipe({
    name,
    country,
    category,
    regime,
    makingTime,
    cookingTime,
    imageUrl,
    instructions,
    ingredients,
    comments: comments || [],  // Si 'comments' est vide, le mettre par défaut à un tableau vide
    pseudo,
    userRef: userId,  // Utilisateur qui crée la recette
  });

  try {
    // Sauvegarder la recette
    const savedRecipe = await newRecipe.save();
    res.status(201).json({ savedRecipe, message: "Recipe saved" });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    next(error);
  }
};

// @desc    recipes & display all recipes with piscture, title and author on Home
// @route   GET /api/recipes/
// @access  Public
export const displayAllRecipes = async (req, res, next) => {
 try {
      // Nombre d'éléments par page
      const pageSize = 6;
      const page = Number(req.query.pageNumber) || 1;

      // Trouver les recettes avec les champs partiels : name, country, cookingTime, imageUrl
      const recipes = await Recipe.find({}, 'name country  cookingTime imageUrl userRef')           
          .populate('userRef', 'username profilePicture') // Populer l'utilisateur avec son nom    
          .skip(pageSize * (page - 1)) // Pagination
          .limit(pageSize);

      // Compter le nombre total de recettes pour la pagination
      const count = await Recipe.countDocuments();

      // Réponse avec les recettes et les infos de pagination
      res.json({
        recipes,
        total: count, // Ajout du total pour les recettes
        page,
        pages: Math.ceil(count / pageSize),
      });
  } catch (error) {
      next(error);
  }
 
};