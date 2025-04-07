import mongoose from 'mongoose';

//importation models
import User from "../models/userModel.js";
import Recipe from "../models/recipeModel.js";


// @desc    Add one recipe to favorites
// @route   POST /api/recipes/addFavoriteRecipes
// @access  Private (token required)
export const addFavoriteRecipe = async (req, res) => {
  try {
    // 1. Vérifier si `req.user` est défini
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Utilisateur non authentifié" });
    }

    // 2. Récupérer l'ID de la recette depuis le body
    const { recipeId } = req.body;
    console.log("1. Recipe ID received:", recipeId);

    // 3. Vérifier si `recipeId` est fourni et valide
    if (!recipeId || !mongoose.Types.ObjectId.isValid(recipeId)) {
      return res.status(400).json({ message: "ID de recette invalide" });
    }

    // 4. Trouver la recette
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recette introuvable" });
    }
    console.log("2. Recipe found:", recipe.title);

    // 5. Récupérer l'utilisateur authentifié
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    console.log("3. User found:", user.username);

    // 6. Vérifier si la recette est déjà enregistrée
    if (user.savedRecipe.includes(recipeId)) {
      return res.status(400).json({ message: "Recette déjà ajoutée aux favoris" });
    }

    // 7. Ajouter la recette aux favoris
    user.savedRecipe.push(recipeId);
    await user.save();
    console.log("4. Updated user saved recipes:", user.savedRecipe);

    // 8. Retourner la liste mise à jour des recettes favorites
    return res.status(200).json({ savedRecipes: user.savedRecipe });
  } catch (error) {
    console.error("Erreur lors de l'ajout de la recette aux favoris:", error);
    return res.status(500).json({ message: "Erreur interne du serveur" });
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


// @desc    Display recipes of favorite recipes by user and recipes userId === userRef avec pagination
// @route   GET /api/recipes/AllFavoriteRecipes/
// @access  Private (token)
export const getAllFavoriteRecipes = async (req, res, next) => {
  try {
    // 0. Nombre d'éléments par page
    const pageSize = 6;
    const page = Number(req.query.pageNumber) || 1;
    
    // 1. Récupérer le user et populate ses savedRecipe
    const user = await User.findById(req.user.id).populate({
      path: 'savedRecipe',
      select: 'name country category regime makingTime cookingTime imageUrl',
      populate: { path: 'userRef', select: 'username profilePicture' }, 
    });
    
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    console.log('Utilisateur et recettes sauvegardées : ', user); 
    
    // 2. Récupérer les recettes où userId === userRef
    const userRecipes = await Recipe.find({ userRef: req.user.id })
  .populate("userRef", "username profilePicture");
    
    // 3. Vérifier si le user a des savedRecipes et userRef (s'il a créé des recettes)
    const favoriteRecipes = user.savedRecipe.concat(userRecipes);
    
    if (favoriteRecipes.length === 0) {
      return res.status(200).json({ message: "Aucune recette favorite trouvée" });
    }
    
    // 4. Appliquer la pagination sur toutes les recettes
    const startIndex = (page - 1) * pageSize;
    const paginatedRecipes = favoriteRecipes.slice(startIndex, startIndex + pageSize);
    
    // 5. Compter le nombre total de recettes favorites
    const totalRecipes = favoriteRecipes.length;
    
    // 6. Retourner les recettes paginées avec les informations de pagination
    res.status(200).json({
      recipes: paginatedRecipes,
      page,
      pages: Math.ceil(totalRecipes / pageSize),
      totalRecipes,
    });
  } catch (error) {
    // 7. Message d'erreur en cas d'échec
    console.error(error);
    res.status(500).json({ message: "Erreur serveur, veuillez réessayer plus tard" });
  }
};


///////////////////////////////////////////////////////////////////////////
// Search et filtrer
///////////////////////////////////////////////////////////////////////////

// @desc    Search recipes & display one recipe on homeScreen
// @route   GET /api/favoriteRecipes/search/query
// @access   Private (token)
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

    // 4. Récupérer tous les utilisateurs avec leurs recettes favorites peuplées
    const usersWithFavorites = await User.find()
    .populate({
      path: 'savedRecipe',
      populate: { path: 'userRef', select: 'username' },
    });


    // 5. Rassembler toutes les recettes favorites dans un seul tableau
    let matchingRecipes = [];
    for (const user of usersWithFavorites) {
      const filtered = user.savedRecipe.filter((recipe) => {
        return (
          searchRegex.test(recipe.name) ||
          searchRegex.test(recipe.country) ||
          searchRegex.test(recipe.category) ||
          searchRegex.test(recipe.regime) ||
          searchRegex.test(recipe.modeCook) ||
          recipe.ingredients?.some((ing) => searchRegex.test(ing.name)) ||
          searchRegex.test(recipe.userRef?.username || '')
        );
      });
      matchingRecipes.push(...filtered);
    }

    // 6. Si aucune recette n'est trouvée

    if (matchingRecipes.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Aucune recette favorite trouvée pour le terme recherché.',
        statusCode: 404,
      });
    }

    // 7. Retourner les recettes trouvées
    res.status(200).json({
      success: true,
      recipes: matchingRecipes,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Filter favorite recipes by multiple criteria and display them on the home screen
// @route   GET /api/favoriteRecipes/filterFavorite?category=desserts&country=France
// @access  Private (requires authentication token)
export const filtreFavoriteRecipe = async (req, res, next) => {
  try {
    // 1. Recuperer query parameters 
    const { name, country, category, regime, ingredient, pseudo, modeCook } = req.query;
    console.log(name, country, category, regime, ingredient, pseudo, modeCook);

    // 2. Definir une function insensible à la case (regex)
    const regexFilter = (value) => new RegExp(value, 'i');

    // 3. Initialiser l'objet filter 
    let usersQuery = {};
    if (pseudo) {
      // Ajouter un regex filter pour le username 
      usersQuery.username = { $regex: regexFilter(pseudo) };
    }

    // 4. trouver users qui match avec le pseudo pseudo et populate les saved recipes
    const users = await User.find(usersQuery).populate({
      path: 'savedRecipe',
      populate: { path: 'userRef', select: 'username' },
    });

    // 5. Initialiser un tableau pour les recettes favoris qui match avec les critères
    let matchingRecipes = [];

    // 6. Iteratuion sur chaque each user's saved recipes et appliquer les filtres
    for (const user of users) {
      const filtered = user.savedRecipe.filter((recipe) => {
        return (
          (!name || regexFilter(name).test(recipe.name)) &&
          (!country || regexFilter(country).test(recipe.country)) &&
          (!category || regexFilter(category).test(recipe.category)) &&
          (!regime || regexFilter(regime).test(recipe.regime)) &&
          (!modeCook || regexFilter(modeCook).test(recipe.modeCook)) &&
          (!ingredient || recipe.ingredients?.some((ing) => regexFilter(ingredient).test(ing.name)))
        );
      });
      // 7. Ajouter les recettes filtrés  dans le tableau matchingRecipes
      matchingRecipes.push(...filtered);
    }

    // 8. Verifie si aucune recette match avec les criteres
    if (matchingRecipes.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No favorite recipes found for the provided criteria.',
        statusCode: 404,
      });
    }

    // 9. Retour/envoie 
    res.status(200).json({
      success: true,
      recipes: matchingRecipes,
    });
  } catch (error) {
    next(error);
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

// @desc    Display  recipes of favorite recipes by user on ReadOneRecipe && signIn
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
