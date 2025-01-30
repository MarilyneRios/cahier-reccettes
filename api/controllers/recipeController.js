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

// @desc    Display one recipe with all information
// @route   GET /api/recipes/:id
// @access  Private (token)
export const displayOneRecipe = async (req, res, next) => {
  try {
 
    // Rechercher la recette par ID
    const id = req.params.id;

    // Trouver une recette avec le ID
    const recipe = await Recipe.findById(id).populate('userRef', 'username profilePicture');

    // Vérifier si la recette existe
    if (!recipe) {
      return res.status(404).json({ message: "Recette non trouvée" });
    }

    // Réponse avec la recette entière
    res.json({ recipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur du serveur' });
  }
};

// @desc    Update 1 recipe
// @route   PATCH /api/recipes/:id
// @access  Private (token)
export const updateRecipe = async (req, res, next) => {
  console.log('Received request to update recipeId:', req.params.id);
  const recipeId = req.params.id;

  try {
    if (!req.user || !req.user.id) {
      console.error('User not authenticated or missing _id. req.user:', req.user);
      return res.status(401).json({ message: "Vous n'êtes pas authentifié" });
    }

    console.log('Request body:', req.body);

    const recipe = await Recipe.findById(recipeId).populate('userRef', 'username profilePicture');

    if (!recipe) {
      console.error('Recipe not found for ID:', recipeId);
      return res.status(404).json({ message: "Recette non trouvée" });
    }

    if (!recipe.userRef || recipe.userRef._id.toString() !== req.user.id.toString()) {
      console.error('Unauthorized update attempt. Recipe user ID:', recipe.userRef ? recipe.userRef._id : 'undefined', 'Request user ID:', req.user.id);
      return res.status(401).json({ message: "Vous n'avez pas l'autorisation de modifier cette recette" });
    }

    const updatedFields = {};

    // Update fields only if provided in request body
    if (req.body.name) updatedFields.name = req.body.name;
    if (req.body.country) updatedFields.country = req.body.country;
    if (req.body.category) updatedFields.category = req.body.category;
    if (req.body.regime) updatedFields.regime = req.body.regime;
    if (req.body.ingredients) updatedFields.ingredients = req.body.ingredients;
    if (req.body.instructions) updatedFields.instructions = req.body.instructions;
    if (req.body.makingTime) updatedFields.makingTime = req.body.makingTime;
    if (req.body.cookingTime) updatedFields.cookingTime = req.body.cookingTime;
    if (req.body.pseudo) updatedFields.pseudo = req.body.pseudo;
    if (req.body.comments) updatedFields.comments = req.body.comments;
    if (req.body.imageUrl) updatedFields.imageUrl = req.body.imageUrl;

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      recipeId,
      { $set: updatedFields },
      { new: true }
    );

    res.status(200).json({
      _id: updatedRecipe._id,
      name: updatedRecipe.name,
      country: updatedRecipe.country,
      category: updatedRecipe.category,
      regime: updatedRecipe.regime,
      ingredients: updatedRecipe.ingredients,
      instructions: updatedRecipe.instructions,
      makingTime: updatedRecipe.makingTime,
      cookingTime: updatedRecipe.cookingTime,
      pseudo: updatedRecipe.pseudo,
      comments: updatedRecipe.comments,
      imageUrl: updatedRecipe.imageUrl,
      message: "Recette mise à jour avec succès",
    });
  } catch (error) {
    console.error('Error updating recipe:', error);
    res.status(500).json({ message: 'Erreur du serveur' });
  }
};
