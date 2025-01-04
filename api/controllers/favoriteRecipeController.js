import mongoose from 'mongoose';

//importation models
import User from "../models/userModel.js";
import Recipe from "../models/recipeModel.js";
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

     // 8. si recipe existe déjà dans savedrecipes
     if (user.savedRecipe.includes(recipeId)) {
        return res.status(400).json({ message: 'Recette déjà ajoutée aux favoris' });
     }

      // 9. sauvgarder recipeId
      user.savedRecipe.push(recipeId);
      await user.save();
      console.log("5. Updated user saved recipes:", user.savedRecipe);


      //10. renvoi au format json
      return res.json({ savedRecipes: user.savedRecipe });
    } catch (error) {
        console.error("Error adding recipe to favorites:", error);
      return res.status(500).json({ message: "Erreur lors de l'ajout de la recette aux favoris"});
    }
  };

// @desc    Remove 1 recipe to favorite recipes by user on favorite && signIn
// @route   DELETE /api/recipes/favorites/:id
// @access  Private
export const removeFavoriteRecipe = async (req, res, next) => {
    try {
      // 1. Accéder à l'ID de la recette depuis les paramètres de l'URL
      const recipeId = req.params.id; 
      console.log("1. recipeID", recipeId);
  
      // 2. Vérifier si l'ID de la recette est fourni
      if (!recipeId) {
        return res.status(400).json({ message: 'ID de recette manquant dans l\'URL de la requête' });
      }
  
      // 3. Trouver la recette
      const recipe = await Recipe.findById(recipeId);
      console.log("2. Recette trouvée :", recipe);
  
      // 4. Vérifier si la recette existe
      if (!recipe) {
        return res.status(404).json({ message: 'Recette introuvable' });
      }
  
      // 5. 'user' est un objet utilisateur authentifié
      const userId = req.user.id;
      console.log("3. ID utilisateur depuis la requête :", userId);
  
      // 6. Trouver l'utilisateur
      const user = await User.findById(userId);
      console.log("4. Utilisateur trouvé :", user);
  
      // 7. Vérifier si l'utilisateur est null
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
  
      // 8. Supprimer le recipeId de la liste des recettes sauvegardées
      user.savedRecipe = user.savedRecipe.filter(id => id.toString() !== recipeId.toString()); // Suppression à l'aide de filter
      await user.save();
      console.log("5. Recettes sauvegardées mises à jour :", user.savedRecipe);
  
      // 9. Retourner un message de succès
      return res.json({ message: 'Recette supprimée des favoris avec succès', savedRecipes: user.savedRecipe });
    } catch (error) {
      console.error("Erreur lors de la suppression de la recette des favoris :", error);
      return res.status(500).json({ message: "Erreur lors de la suppression de la recette des favoris" });
    }
  };
  

// @desc    Afficher toutes les recettes favorites avec pagination
// @route   GET /api/recipes/favoriteRecipes
// @access  Private (token)
export const displayAllFavoriteRecipes = async (req, res, next) => {
  try {
    //0. Nombre d'éléments par page
    const pageSize = 6;
    const page = Number(req.query.pageNumber) || 1;

    // 1. Récupérer le user et populate ses savedRecipe
    const user = await User.findById(req.user.id).populate({
      path: 'savedRecipe',
      select: 'name country category regime makingTime cookingTime imageUrl', 
    });
    console.log('Utilisateur et recettes sauvegardées : ', user);

    // 2. Vérifier si le user a des  savedRecipes
    if (user && user.savedRecipe.length > 0) {
      // 3. Appliquer la pagination sur les  savedRecipes
      const startIndex = (page - 1) * pageSize;
      const paginatedRecipes = user.savedRecipe.slice(startIndex, startIndex + pageSize);

      // 4. Compter le nombre total de recettes favorites
      const count = user.savedRecipe.length;

      // 5. Retourner les recettes paginées avec les informations de pagination
      return res.json({
        recipes: paginatedRecipes,
        page,
        pages: Math.ceil(count / pageSize),
      });
    } else {
      res.status(404).json({ message: "Aucune recette favorite trouvée" });
    }
  } catch (error) {
    next(error); 
  }
};



// @desc    Display 1 recipe of favorite recipes by user on ReadOneRecipe && signIn
// @route   GET /api/recipes/favoriteOneRecipe/:id
// @access  Private (token)
export const displayOneFavoriteRecipe = async (req, res, next) => {
  try {
    // 1. Récupérer le userId après vérification du token, et peupler ses recettes sauvegardées
    const user = await User.findById(req.user.id).populate('savedRecipe');
    console.log('Utilisateur et recettes sauvegardées : ', user);

    // 2. Récupérer l'ID de la recette favorite depuis les paramètres de la requête
    const recipeId = req.params.id;

    // 3. Vérifier si l'ID de la recette existe dans le tableau des recettes sauvegardées
    const favoriteRecipe = user.savedRecipe.find(recipe => recipe._id.toString() === recipeId);

    // 4. Si la recette favorite existe, la retourner
    if (favoriteRecipe) {
      return res.json(favoriteRecipe);
    } else {
      // 5. Si la recette n'existe pas, renvoyer une erreur 404
      res.status(404).json({ message: "Recette favorite non trouvée" });
    }

  } catch (error) {
    // 6. Gestion des erreurs
    next(error);
  }
};



///////////////////////////////////////////////////////////////////////////
// Search et filtrer
///////////////////////////////////////////////////////////////////////////

// @desc    Search recipes & display one recipe on homeScreen
// @route   GET /api/recipes/search/:query
// @access  Public
export const searchFavoriteRecipe = async (req, res, next) => {
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

// @desc    Filter recipes by category & diplay one recipe on homeScreen
// @route   GET /api/recipes/category/:category
// @access  Public
export const filtreCategoryFavoriteRecipe = async (req, res, next) => {
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
export const filtreRegimeFavoriteRecipe = async (req, res, next) => {
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