//importation models
import User from "../models/userModel.js";
import Recipe from "../models/recipeModel.js";
import Ingredient from "../models/ingredientModel.js"
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
export const displayAllRecipes = async (req, res, next) => {
    try {
        // Nombre d'éléments par page
        const pageSize = 6;
        const page = Number(req.query.pageNumber) || 1;

        // Trouver les recettes avec les champs partiels : name, country, category, regime, makingTime, cookingTime, imageUrl
        const recipes = await Recipe.find({}, 'name country category regime makingTime cookingTime imageUrl userRef')           
             .populate('userRef', 'username profilePicture') // Populer l'utilisateur avec son nom    
            .skip(pageSize * (page - 1)) // Pagination
            .limit(pageSize);

        // Compter le nombre total de recettes pour la pagination
        const count = await Recipe.countDocuments();

        // Réponse avec les recettes et les infos de pagination
        res.json({
            recipes,
            page,
            pages: Math.ceil(count / pageSize),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur du serveur' });
    }
};


// @desc    recipes & display one recipe with all informations on ReadOneRecipe
// @route   GET /api/recipes/:id
// @access  Public
export const displayOneRecipes = async (req, res, next) => {};

// @desc    create 1 recipe && signIn
// @route   POST /api/recipes
// @access  Private (token)
export const createRecipe = async (req, res, next) => {
  try {
    const {
        name,
        country,
        category,
        regime,
        makingTime,
        cookingTime,
        imageUrl,
        instructions,
        ingredients // Liste des ingrédients avec leurs quantités et unités
    } = req.body;

    // Validation des données 
    if (!name || !ingredients || ingredients.length === 0) {
        return res.status(400).json({
            success: false,
            message: "Le om de la recette  et au moins un ingrédient est nécessaire",
            statusCode: 400
        });
    }

    // Vérification de la validité des ingrédients
    const ingredientEntries = [];
    for (let ingredientData of ingredients) {
        const { ingredientId, quantity, unit } = ingredientData;

        // Vérifier que l'ingrédient existe dans la base de données
        const ingredient = await Ingredient.findById(ingredientId);
        if (!ingredient) {
            return res.status(404).json({
                success: false,
                message: `Ingredient with id ${ingredientId} not found.`,
                statusCode: 404
            });
        }

        // Ajouter l'ingrédient avec quantité et unité à la liste des ingrédients
        ingredientEntries.push({
            ingredient: ingredient._id,
            quantity,
            unit
        });
    }

    // Créer la recette avec les ingrédients
    const newRecipe = new Recipe({
        name,
        country,
        category,
        regime,
        makingTime,
        cookingTime,
        imageUrl,
        instructions,
        ingredients: ingredientEntries, // Ajoute la liste des ingrédients avec quantités et unités
        userRef: req.user.id // Associe l'utilisateur authentifié à la recette
    });

    // Sauvegarder la recette dans la base de données
    const savedRecipe = await newRecipe.save();

     // Récupérer la recette avec les détails des ingrédients peuplés
     const recipeWithDetails = await Recipe.findById(savedRecipe._id)
     .populate({
       path: 'ingredients.ingredient',
       select: 'name'
     })
     .exec();

    // Retourner la recette créée
    res.status(201).json({
      success: true,
      data: recipeWithDetails,
      message: "Recipe created successfully",
      statusCode: 201
    });
} catch (error) {
    console.error("Error occurred while creating recipe:", error);
    next(error);
}
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