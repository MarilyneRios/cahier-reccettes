import mongoose from 'mongoose';

//importation models
import User from "../models/userModel.js";
import Recipe from "../models/recipeModel.js";
import Ingredient from "../models/ingredientModel.js"
// importation sécurité
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


// @desc    add all recipe in favorite
// @route   POST /api/recipes/addFavoriteRecipes
// @access   Private (token) = verifyToken
export const addFavoriteRecipe = async (req, res, next) => {
    try {
      //1. Accéder à l'ID de la recette depuis la requête 
      const recipeId = req.body.recipeId;
      console.log("1. recipeID",recipeId);
  
      //2. Vérifier si l'ID de la recette est fourni
      if (!recipeId) {
        return res.status(400).json({ message: 'ID de recette manquant dans le corps de la requête' });
      }
  
      //3. Trouver la recette
      const recipe = await Recipe.findById(recipeId);
      console.log("2. Recipe found:", recipe);
  
      //4. Vérifier si la recette existe
      if (!recipe) {
        return res.status(404).json({ message: 'Recette introuvable' });
      }
  
      //5. 'user' est un objet utilisateur défini et authentifier
      const userId = req.user.id;
      console.log("3. User ID from request:", userId);

      //6. Trouver le user
      const user = await User.findById(userId);
      console.log("4. User found:", user);

      // 7. si user est null
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }

      // 8. sauvgarder recipeId
      user.savedRecipe.push(recipeId);
      await user.save();
      console.log("5. Updated user saved recipes:", user.savedRecipe);

     // 9. Check if the recipe is already in the user's saved recipes
     if (user.savedRecipe.includes(recipeId)) {
        return res.status(400).json({ message: 'Recette déjà ajoutée aux favoris' });
     }

      //10. renvoi au format json
      return res.json({ savedRecipes: user.savedRecipe });
    } catch (error) {
        console.error("Error adding recipe to favorites:", error);
      return res.status(500).json({ message: "Erreur lors de l'ajout de la recette aux favoris"});
    }
  };

// @desc    recipes & display all recipes with piscture, title and autheur on Home && signIn
// @route   GET /api/recipes/favoriteRecipes
// @access   Private (token)
export const displayAllFavoriteRecipes = async (req, res, next) => {
  //Si user connecté
  console.log(req.user); 
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not signed in");
  }
 
  // Rechercher les savedRecipes par user
  const savedRecipes = await Recipe.find({
    '_id': { $in: user.savedRecipes }
  });

  if (savedRecipes) {
    return res.json(savedRecipes);
  } else {
    res.status(404);
    throw new Error("No favorite recipes found");
  }
};

// @desc    Display 1 recipe of favorite recipes by user on ReadOneRecipe && signIn
// @route   GET /api/recipes/favoriteOneRecipe/:id
// @access   Private (token)
export const displayOneFavoriteRecipe = async (req, res, next) => {
    console.log(req.user); 
    const user = await User.findById(req.user._id);
  
    if (!user) {
      res.status(404);
      throw new Error("User not signed in");
    }
   
    // Rechercher 1 savedRecipe par user
    const savedRecipes = await Recipe.findOne({
      '_id': { $in: user.savedRecipes }
    });
  
    if (savedRecipes) {
      return res.json(savedRecipes);
    } else {
      res.status(404);
      throw new Error("No favorite recipes found");
    }
  
};

// @desc    Remove 1 recipe to favorite recipes by user on favorite && signIn
// @route   DELETE /api/recipes/favorites/:id
// @access  Private
export const removeFavoriteRecipe = async (req, res, next) => {
       //Si user connecté
   console.log(req.user); 
   const user = await User.findById(req.user._id);
 
   if (!user) {
     res.status(404);
     throw new Error("User not signed in");
   }
   // modifier recipe
   const recipe = await Recipe.findById(req.params.id);
   console.log(recipe); 

    //Retirer recipe from favorite recipes et non supprimer de la base de données
    // => .indexOf(req.params.id); au lieu de findByIdAndDelete()

    // 1)  trouver l'index dans le tableau savedRecipes
    const index = user.savedRecipes.indexOf(req.params.id);
   //une valeur  > -1 => l’élément a été trouvé dans le tableau (tableau commence à 0)
    if (index > -1) {
      // 2) supprimer l’élément à cet index du tableau => .splice(index, 1)
      user.savedRecipes.splice(index, 1);

      // 3) sauvegarder la modification
      await user.save();
      res.json({ message: "Recipe removed from favorite recipes" });
    } else {
      res.status(404);
      throw new Error("Recipe not found in favorite recipes");
    }
};


///////////////////////////////////////////////////////////////////////////
// Search et filtrer
///////////////////////////////////////////////////////////////////////////

// @desc    Search recipes & display one recipe on homeScreen
// @route   GET /api/recipes/search/:query
// @access  Public
export const searchFavoriteRecipe = async (req, res, next) => {};

// @desc    Filter recipes by category & diplay one recipe on homeScreen
// @route   GET /api/recipes/category/:category
// @access  Public
export const filtreCategoryFavoriteRecipe = async (req, res, next) => {};

// @desc    Filter recipes by regime & diplay one recipe on homeScreen
// @route   GET /api/recipes/regime/:regime
// @access  Public
export const filtreRegimeFavoriteRecipe = async (req, res, next) => {};