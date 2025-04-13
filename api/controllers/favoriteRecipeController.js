import mongoose from 'mongoose';

//importation models
import User from "../models/userModel.js";
import Recipe from "../models/recipeModel.js";

//logique error
import { errorHandler } from "../utils/error.js";

// Fonction utilitaire pour récupérer toutes les recettes favorites d'un utilisateur
const getUserFavoriteRecipes = async (userId) => {
  console.log(`Récupération des recettes favorites pour l'utilisateur ${userId}...`);

  const user = await User.findById(userId).populate({
    path: 'savedRecipe',
    select: 'name country category regime makingTime cookingTime modeCook imageUrl',
    populate: { path: 'userRef', select: 'username profilePicture' },
  });

  if (!user) {
    console.log("Utilisateur non trouvé");
    throw errorHandler(404, "Utilisateur non trouvé");
  }

  const userRecipes = await Recipe.find({ userRef: userId }).populate("userRef", "username profilePicture");

  console.log(`Recettes favorites récupérées : ${user.savedRecipe.length}, Recettes créées par l'utilisateur : ${userRecipes.length}`);

  return user.savedRecipe.concat(userRecipes);
};

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
    const pageSize = 6;
    const page = Number(req.query.pageNumber) || 1;

    console.log(`Pagination: page ${page}, pageSize ${pageSize}`);

    // 1. Récupérer les recettes favorites de l'utilisateur
    const favoriteRecipes = await getUserFavoriteRecipes(req.user.id);

    if (favoriteRecipes.length === 0) {
      return res.status(200).json({ message: "Aucune recette favorite trouvée" });
    }

    console.log(`Nombre total de recettes favorites : ${favoriteRecipes.length}`);

    // 2. Appliquer la pagination sur toutes les recettes
    const startIndex = (page - 1) * pageSize;
    const paginatedRecipes = favoriteRecipes.slice(startIndex, startIndex + pageSize);

    const totalRecipes = favoriteRecipes.length;

    res.status(200).json({
      recipes: paginatedRecipes,
      page,
      pages: Math.ceil(totalRecipes / pageSize),
      totalRecipes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur, veuillez réessayer plus tard" });
  }
};

// @desc    Search recipes & display one recipe on homeScreen
// @route   GET /api/favoriteRecipes/search
// @access  Private (token)
export const searchFavoriteRecipe = async (req, res, next) => {
  try {
    const query = req.query.query || ''; // Récupère la query (vide par défaut)

    if (!query) {
      return next(errorHandler(400, "Une recherche query est requise!"));
    }

    console.log(`Recherche de recettes avec le terme : ${query}`);

    // Récupérer les recettes favorites de l'utilisateur
    const favoriteRecipes = await getUserFavoriteRecipes(req.user.id);

    // Filtrer les recettes favorites en fonction du query sur plusieurs critères
    const filteredRecipes = favoriteRecipes.filter((recipe) => {
      // Recherche par nom de recette
      const nameMatch = recipe.name.toLowerCase().includes(query.toLowerCase());

      // Recherche par pseudo de l'utilisateur (nom d'utilisateur)
      const usernameMatch = recipe.userRef?.username.toLowerCase().includes(query.toLowerCase());

      // Recherche par ingrédients (vérifier si le champ existe et est un tableau)
      const ingredientsMatch = recipe.ingredients && Array.isArray(recipe.ingredients)
        ? recipe.ingredients.some(ingredient =>
            ingredient.name.toLowerCase().includes(query.toLowerCase())
          )
        : false; // Si ingredients n'existe pas ou n'est pas un tableau, on passe à false

      // Recherche par pays
      const countryMatch = recipe.country?.toLowerCase().includes(query.toLowerCase());

      // Recherche par mode de cuisson
      const modeCookMatch = recipe.modeCook?.toLowerCase().includes(query.toLowerCase());

      // Recherche par régime
      const regimeMatch = recipe.regime?.toLowerCase().includes(query.toLowerCase());

      // Recherche par catégorie
      const categoryMatch = recipe.category?.toLowerCase().includes(query.toLowerCase());

      // Retourner true si l'un des critères correspond
      return nameMatch || usernameMatch || ingredientsMatch || countryMatch || modeCookMatch || regimeMatch || categoryMatch;
    });

    console.log(`Recettes filtrées : ${filteredRecipes.length}`);

    if (filteredRecipes.length === 0) {
      return res.status(404).json({ message: "Aucune recette trouvée" });
    }

    // Retourner les recettes filtrées
    res.status(200).json(filteredRecipes);

  } catch (error) {
    console.error("Erreur lors de la recherche de recettes favorites :", error);
    next(errorHandler(500, "Erreur serveur, veuillez réessayer plus tard"));
  }
};

// @desc    Filter favorite recipes by multiple criteria and display them on the home screen
// @route   GET /api/favoriteRecipes/filterFavorite?country=France&category=Desserts&regime=Vegan&modeCook=Four
// @access  Private (requires authentication token)
export const filtreFavoriteRecipe = async (req, res, next) => {
  try {
    // Récupérer les critères de filtrage depuis les query parameters
    const { country, category, regime, modeCook } = req.query;
    console.log(`Filtres reçus :`, { country, category, regime, modeCook });

    // Récupérer les recettes favorites de l'utilisateur
    const favoriteRecipes = await getUserFavoriteRecipes(req.user.id);

    // Filtrer les recettes favorites en fonction des critères
    const filteredRecipes = favoriteRecipes.filter((recipe) => {
      // Vérifie si les critères sont définis et applique les filtres

      // Filtre par pays
      const countryMatch = country ? recipe.country?.toLowerCase().includes(country.toLowerCase()) : true;

      // Filtre par catégorie
      const categoryMatch = category ? recipe.category?.toLowerCase().includes(category.toLowerCase()) : true;

      // Filtre par régime
      const regimeMatch = regime ? recipe.regime?.toLowerCase().includes(regime.toLowerCase()) : true;

      // Filtre par mode de cuisson
      const modeCookMatch = modeCook ? recipe.modeCook?.toLowerCase().includes(modeCook.toLowerCase()) : true;

      // Retourne la recette si elle correspond à l'un des critères définis
      return countryMatch && categoryMatch && regimeMatch && modeCookMatch;
    });

    console.log(`Recettes filtrées : ${filteredRecipes.length}`);

   

    // Retourner les recettes filtrées
    res.status(200).json(filteredRecipes);

  } catch (error) {
    console.error("Erreur lors de la recherche de recettes favorites :", error);
    next(errorHandler(500, "Erreur serveur, veuillez réessayer plus tard"));
  }
};


