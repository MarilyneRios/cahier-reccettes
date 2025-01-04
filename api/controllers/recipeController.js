import Recipe from '../models/recipeModel.js';
import { errorHandler } from '../utils/error.js';

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
