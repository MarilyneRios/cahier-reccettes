//importation models
import User from '../models/userModel.js';
import Recipe from '../models/recipeModel.js'
// importation sécurité
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";

///////////////////////////////////////////////////////////////////////////
// recipes
///////////////////////////////////////////////////////////////////////////

// @desc    recipes & display all recipes with piscture, title and autheur on Home 
// @route   GET /api/recipes/
// @access  Public

// @desc    recipes & display one recipe with all informations on ReadOneRecipe 
// @route   GET /api/recipes/:id
// @access  Public


// @desc    create 1 recipe && signIn
// @route   POST /api/recipes
// @access  Private (token)


// @desc    Update 1 recipe && signIn
// @route   PUT /api/recipes/:id
// @access  Private (token)


// @desc    Delete 1 recipe && signIn
// @route   DELETE /api/recipes/:id
// @access  Private (token)

///////////////////////////////////////////////////////////////////////////
// favorite
///////////////////////////////////////////////////////////////////////////

// @desc    recipes & display all recipes with piscture, title and autheur on Home && signIn
// @route   GET /api/recipes/favoriteRecipes
// @access   Private (token)

// @desc    Display 1 recipe of favorite recipes by user on ReadOneRecipe && signIn
// @route   GET /api/recipes/favoriteOneRecipe/:id
// @access   Private (token)


// @desc    Add 1 recipe to favorite recipes by user on favorite && signIn
// @route   POST /api/recipes/favorites
// @access  Private

// @desc    Remove 1 recipe to favorite recipes by user on favorite && signIn
// @route   DELETE /api/recipes/favorites/:id
// @access  Private

///////////////////////////////////////////////////////////////////////////
// Search et filtrer
///////////////////////////////////////////////////////////////////////////

// @desc    Search recipes & display one recipe on homeScreen
// @route   GET /api/recipes/search/:query
// @access  Public

// @desc    Filter recipes by category & diplay one recipe on homeScreen
// @route   GET /api/recipes/category/:category
// @access  Public