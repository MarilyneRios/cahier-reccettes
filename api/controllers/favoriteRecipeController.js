//importation models
import User from "../models/userModel.js";
import Recipe from "../models/recipeModel.js";
import Ingredient from "../models/ingredientModel.js"
// importation sécurité
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


// @desc    recipes & display all recipes with piscture, title and autheur on Home && signIn
// @route   GET /api/recipes/favoriteRecipes
// @access   Private (token)
export const displayAllFavoriteRecipes = async (req, res, next) => {};

// @desc    Display 1 recipe of favorite recipes by user on ReadOneRecipe && signIn
// @route   GET /api/recipes/favoriteOneRecipe/:id
// @access   Private (token)
export const displayOneFavoriteRecipe = async (req, res, next) => {};

// @desc    add all recipe in favorite
// @route   POST /api/recipes/addFavoriteRecipes
// @access   Private (token)
export const addFavoriteRecipe = async (req, res, next) => {};

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
export const searchFavoriteRecipe = async (req, res, next) => {};

// @desc    Filter recipes by category & diplay one recipe on homeScreen
// @route   GET /api/recipes/category/:category
// @access  Public
export const filtreCategoryFavoriteRecipe = async (req, res, next) => {};

// @desc    Filter recipes by regime & diplay one recipe on homeScreen
// @route   GET /api/recipes/regime/:regime
// @access  Public
export const filtreRegimeFavoriteRecipe = async (req, res, next) => {};