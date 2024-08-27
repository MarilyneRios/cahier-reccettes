//importation models
import User from "../models/userModel.js";
import Recipe from "../models/recipeModel.js";
// importation sécurité
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

///////////////////////////////////////////////////////////////////////////
// recipes
///////////////////////////////////////////////////////////////////////////

// @desc    recipes & display all recipes with piscture, title and autheur on Home
// @route   GET /api/recipes/
// @access  Public
export const displayAllRecipes = async (req, res, next) => {};

// @desc    recipes & display one recipe with all informations on ReadOneRecipe
// @route   GET /api/recipes/:id
// @access  Public
export const displayOneRecipes = async (req, res, next) => {};

// @desc    create 1 recipe && signIn
// @route   POST /api/recipes
// @access  Private (token)
export const createRecipe = async (req, res, next) => {

    // création de recette
    const recipe = await Recipe.create({
      name: req.body.name,
      country: req.body.country,
      category: req.body.category,
      regime: req.body.regime,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      makingTime: req.body.makingTime,
      cookingTime: req.body.cookingTime,
      comments: req.body.comments,
      pseudo: req.body.pseudo,
      imageUrl: req.body.imageUrl,
      // relier la recette avec le user auth
      userRef: req.user.id,
    });

    // sauver la recette dans la database
    await recipe.save();
    // envoie un msg de réussite
    res.status(201).json({ message: "Création de recette réussie", recipe });
  
};

// @desc    Update 1 recipe && signIn
// @route   PUT /api/recipes/:id
// @access  Private (token)
export const updateRecipe = async (req, res, next) => {};

// @desc    Delete 1 recipe && signIn
// @route   DELETE /api/recipes/:id
// @access  Private (token)
export const deleteRecipe = async (req, res, next) => {};

///////////////////////////////////////////////////////////////////////////
// favorite
///////////////////////////////////////////////////////////////////////////

// @desc    recipes & display all recipes with piscture, title and autheur on Home && signIn
// @route   GET /api/recipes/favoriteRecipes
// @access   Private (token)
export const favoriteRecipes = async (req, res, next) => {};

// @desc    Display 1 recipe of favorite recipes by user on ReadOneRecipe && signIn
// @route   GET /api/recipes/favoriteOneRecipe/:id
// @access   Private (token)
export const favoriteOneRecipe = async (req, res, next) => {};

// @desc    Remove 1 recipe to favorite recipes by user on favorite && signIn
// @route   DELETE /api/recipes/favorites/:id
// @access  Private
export const removeFavoriteRecipe = async (req, res, next) => {};

///////////////////////////////////////////////////////////////////////////
// Search et filtrer
///////////////////////////////////////////////////////////////////////////

// @desc    Search recipes & display one recipe on homeScreen
// @route   GET /api/recipes/search/:query
// @access  Public
// by name recipe, name author and ingredient
export const searchRecipe = async (req, res, next) => {};

// @desc    Filter recipes by category & diplay one recipe on homeScreen
// @route   GET /api/recipes/category/:category
// @access  Public
export const filtreRecipe = async (req, res, next) => {};

// @desc    Filter recipes by regime & diplay one recipe on homeScreen
// @route   GET /api/recipes/regime/:regime
// @access  Public
export const filtreRegimeRecipe = async (req, res, next) => {};

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