import mongoose from 'mongoose';

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
            message: "Ecrire au moins le nom de la recette  et un ingrédient !",
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

// @desc    Update 1 recipe
// @route   POST /api/recipes/:id
// @access  Private (token)
export const updateRecipe = async (req, res, next) => {
    console.log('Received request to update recipeId:', req.params.id);
    const recipeId = req.params.id;
    try {

    // Vérifie si req.user est défini et contient id
    if (!req.user || !req.user.id) {
        console.error('User not authenticated or missing _id. req.user:', req.user);
        return res.status(401).json({ message: "Vous n'êtes pas authentifié" });
    }

      // 1. Afficher le corps de la requête :
      console.log('Request body:', req.body);
  
      //2. Trouver la recette par ID et populate 'userRef'
      const recipe = await Recipe.findById(recipeId).populate('userRef', 'username profilePicture');
     
      // 3. Vérifier si la recette existe (et l'afficher) :
      if (!recipe) {
        console.error('Recipe not found for ID:', recipeId);
        return res.status(404).json({ message: "Recette non trouvée" });
      } else {
        //console.log('Found recipe:', recipe); = OK
      }
  
      // 4. Vérifier l'autorisation de l'utilisateur (et afficher les IDs des utilisateurs) :
      if (!recipe.userRef || !req.user || recipe.userRef._id.toString() !== req.user.id.toString()) {
        console.error('Unauthorized update attempt. Recipe user ID:', recipe.userRef ? recipe.userRef._id : 'undefined', 'Request user ID:', req.user.id);
        return res.status(401).json({ message: "Vous n'avez pas l'autorisation de modifier cette recette" });
      } else {
        console.log('Authorized update. User ID:', req.user.id);
     } 
  
       //5. Créer l'objet updatedFields :
        const updatedFields = {};

        // 6. Mettre à jour les champs de la recette seulement s'ils sont présents dans req.body
        if (req.body.name) updatedFields.name = req.body.name;
        if (req.body.country) updatedFields.country = req.body.country;
        if (req.body.category) updatedFields.category = req.body.category;
        if (req.body.regime) updatedFields.regime = req.body.regime;
        if (req.body.ingredients) updatedFields.ingredients = req.body.ingredients;
        if (req.body.instructions) updatedFields.instructions = req.body.instructions;
        if (req.body.makingTime) updatedFields.makingTime = req.body.makingTime;
        if (req.body.cookingTime) updatedFields.cookingTime = req.body.cookingTime;
        if (req.body.pseudo) updatedFields.pseudo = req.body.pseudo;
        if (req.body.imageUrl) updatedFields.imageUrl = req.body.imageUrl;
  
       //7. Mettre à jour la recette :
      const updatedRecipe = await Recipe.findByIdAndUpdate(
       req.params.id,
       { $set: updatedFields },
        { new: true }
      );
  
      // 8.  Réponse avec la recette mise à jour
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
            imageUrl: updatedRecipe.imageUrl,
            message: "Recette mise à jour avec succès"
        });
    } catch (error) {
      console.error('Error updating recipe:', error);
      res.status(500).json({ message: 'Erreur du serveur' });
    }
};
  
// @desc    Delete 1 recipe
// @route   DELETE /api/recipes/:id
// @access  Private (token)
export const deleteRecipe = async (req, res, next) => {
    console.log('Received request to delete recipeId:', req.params.id);

    try {
        // 1. Trouver la recette par ID et populate 'userRef'
        const recipe = await Recipe.findById(req.params.id).populate('userRef', 'username profilePicture');
        
        // 2. Vérifier si la recette existe
        if (!recipe) {
            console.error('Recipe not found for ID:', req.params.id);
            return res.status(404).json({ message: "Recette non trouvée" });
        }
        
        // 3. Vérifier l'autorisation de l'utilisateur
        if (!recipe.userRef || !req.user || recipe.userRef._id.toString() !== req.user.id.toString()) {
            console.error('Unauthorized delete attempt. Recipe user ID:', recipe.userRef ? recipe.userRef._id : 'undefined', 'Request user ID:', req.user.id);
            return res.status(401).json({ message: "Vous n'avez pas l'autorisation de supprimer cette recette" });
        } else {
            console.log('Authorized delete. User ID:', req.user.id);
        }
        
        // 4. Supprimer la recette
        await Recipe.findByIdAndDelete(req.params.id);

        // Réponse après suppression
        res.status(200).json({ message: 'La recette a été supprimée avec succès' });
    } catch (error) {
        console.error('Error deleting recipe:', error);
        next(error);
    }
};


///////////////////////////////////////////////////////////////////////////
// Search et filtrer
///////////////////////////////////////////////////////////////////////////

// @desc    Search recipes & display one recipe on homeScreen
// @route   GET /api/recipes/search/:query
// @access  Public
// by name recipe, name author and ingredient
export const searchRecipe = async (req, res, next) => {
  try {
    // 1. Récupération du terme de recherche dans les paramètres
    const searchTerm = req.params.query;
    console.log('searchTerm is', searchTerm);

    // 2. Si aucun terme de recherche n'est fourni
    if (!searchTerm) {
      return res.status(400).json({
        success: false,
        message: "Le paramètre 'query' est requis.",
        statusCode: 400,
      });
    }

    // 3. Recherche insensible à la casse
    const searchRegex = new RegExp(searchTerm, "i");

     // 4. Rechercher l'utilisateur correspondant au terme (par nom)
     let user = null;
     if (!mongoose.Types.ObjectId.isValid(searchTerm)) {
       // Si le terme de recherche n'est pas un ObjectId, rechercher un utilisateur par nom
       user = await User.findOne({ username: { $regex: searchRegex } });
       console.log('user found:', user);
     }

    // 5. Recherche des recettes par nom, pays ou userRef (si user trouvé)
    const recipes = await Recipe.find({
      $or: [
        { name: { $regex: searchRegex } },
        { country: { $regex: searchRegex } },
        { userRef: user ? user._id : null }, // Si user trouvé, chercher par userRef
      ].filter(condition => condition), // Supprimer les conditions nulles
    }).populate("userRef", "username"); // On récupère aussi le username de l'utilisateur via `userRef`


    // 6. Si aucune recette n'est trouvée
    if (recipes.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Aucune recette trouvée pour le terme recherché.",
        statusCode: 404,
      });
    }

    // 7. Retourner les recettes trouvées
    res.status(200).json({
      success: true,
      recipes,
    });
  } catch (error) {
    next(error);
  }
};

/**
Pour Utiliser mongoose.Types.ObjectId.isValid(), 
qui permet de vérifier si une chaîne de caractères est un ObjectId valide.
il faut : "import mongoose from 'mongoose';"
*/


// @desc    Filter recipes by category & diplay one recipe on homeScreen
// @route   GET /api/recipes/category/:category
// @access  Public
export const filtreCategoryRecipe = async (req, res, next) => {
  try {
    // 1. Récupérer le paramètre de catégorie dans les query params
    const category = req.query.category;
    console.log(category);
    
    // 2. Vérifier si la catégorie est fournie
    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Le paramètre 'category' est requis.",
        statusCode: 400,
      });
    }

    //3. Filtrer les recettes par catégorie
    const recipes = await Recipe.find({ category: category });

    // Si aucune recette n'est trouvée
    if (recipes.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Aucune recette trouvée pour la catégorie spécifiée.",
        statusCode: 404,
      });
    }

    //4. Retourner les recettes filtrées
    res.status(200).json({
      success: true,
      recipes,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Filter recipes by regime & diplay one recipe on homeScreen
// @route   GET /api/recipes/regime/:regime
// @access  Public
export const filtreRegimeRecipe = async (req, res, next) => {
  try {
    // 1. Récupérer le paramètre de regime dans les query params
    const regime = req.query.regime;
    console.log(regime);
    
    // 2. Vérifier si le regime est fournie
    if (!regime) {
      return res.status(400).json({
        success: false,
        message: "Le paramètre 'regime' est requis.",
        statusCode: 400,
      });
    }

    //3. Filtrer les recettes par regime
    const recipes = await Recipe.find({ regime: regime });

    // Si aucune recette n'est trouvée
    if (recipes.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Aucune recette trouvée pour le regime spécifié.",
        statusCode: 404,
      });
    }

    //4. Retourner les recettes filtrées
    res.status(200).json({
      success: true,
      recipes,
    });
  } catch (error) {
    next(error);
  }
};