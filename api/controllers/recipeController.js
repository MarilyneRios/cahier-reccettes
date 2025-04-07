import mongoose from 'mongoose';
import Recipe from '../models/recipeModel.js';
import User from '../models/userModel.js';


///////////////////////////////////////////////////////////////////////////
// recipes
///////////////////////////////////////////////////////////////////////////

// @desc    create 1 recipe && signIn
// @route   POST /api/recipes
// @access  Private (token)
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
    modeCook,
    piece,
    imageUrl,
    instructions,
    ingredients, // Liste des ingrédients avec leurs quantités et unités
    comments,
    commentsRecipe,
    pseudo,
  } = req.body;

  // Validation des champs
  if (!name || !country || !category || !modeCook || !piece || !regime || !ingredients || !instructions || !userId) {
    return res.status(400).json({ message: 'Tous les champs requis doivent être remplis, y compris userId.' });
  }

  // Validation de la catégorie
  const validCategories = ['aperitifs', 'entrees', 'plats', 'desserts', 'boissons', 'salades', 'autres'];
  if (!validCategories.includes(category)) {
    return res.status(400).json({
      success: false,
      message: "Catégorie invalide.",
    });
  }

  // Validation du régime
  const validRegimes = ['traditionnelle', 'vegetarien', 'vegan', 'sans-gluten', 'sans-lactose', 'autres'];
  if (!validRegimes.includes(regime)) {
    return res.status(400).json({
      success: false,
      message: "Régime invalide.",
    });
  }

  // Validation du mode de cuisson
  const validModeCook = ['vapeur', 'airFryer', 'griller', 'four', 'autoCuiseur', 'déshydrater', 'sauté', 'mijoter', 'bouillir', 'rôtir', 'pocher', 'frire', 'autres'];
  if (!validModeCook.includes(modeCook)) {
    return res.status(400).json({
      success: false,
      message: "Mode de cuisson invalide.",
    });
  }

  // Créer la nouvelle recette
  const newRecipe = new Recipe({
    name,
    country,
    category,
    regime,
    makingTime,
    cookingTime,
    modeCook,
    piece,
    imageUrl,
    instructions,
    ingredients,
    comments: comments || [],  // Si 'comments' est vide, le mettre par défaut à un tableau vide
    commentsRecipe: commentsRecipe || [],  // Si 'commentsRecipe' est vide, le mettre par défaut à un tableau vide
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
    if (req.body.piece) updatedFields.piece = req.body.piece;
    if (req.body.pseudo) updatedFields.pseudo = req.body.pseudo;
    if (req.body.comments) updatedFields.comments = req.body.comments;
    if (req.body.imageUrl) updatedFields.imageUrl = req.body.imageUrl;
    if (req.body.modeCook) updatedFields.modeCook = req.body.modeCook; // Ajout de la mise à jour pour modeCook

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
      piece: updatedRecipe.piece,
      pseudo: updatedRecipe.pseudo,
      comments: updatedRecipe.comments,
      imageUrl: updatedRecipe.imageUrl,
      modeCook: updatedRecipe.modeCook, // Ajout de modeCook dans la réponse
      message: "Recette mise à jour avec succès",
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
          return res.status(403).json({ message: "Vous n'avez pas l'autorisation de supprimer cette recette" });
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
/*
export const searchRecipe = async (req, res, next) => {
  try {
    // Affiche la requête reçue avec les paramètres
    console.log("🔍 Requête reçue avec query :", req.query);

    // Récupération des critères de recherche
    const { name, country, category, regime, ingredient, pseudo } = req.query;

    // Vérification si aucun critère n'est fourni
    if (!name && !country && !category && !regime && !ingredient && !pseudo) {
      console.log("❌ Aucun critère de recherche fourni");
      return res.status(400).json({
        success: false,
        message: "Aucun critère de recherche fourni.",
        statusCode: 400,
      });
    }

    // Initialisation de l'objet filter pour la recherche
    let filter = {};

    // Fonction pour générer une regex permettant la recherche avec plusieurs mots
    const createMultiWordRegex = (query) => {
      console.log(`📌 Création de regex pour "${query}"`);
      const words = query.trim().split(/\s+/); // Sépare par espace
      return new RegExp(words.join("&"), "i"); // Recherche "OU" entre les mots
    };

    // Application des filtres sur chaque critère fourni
    if (name) {
      filter.name = { $regex: createMultiWordRegex(name) };
      console.log("📝 Filtre ajouté - name :", filter.name);
    }
    if (country) {
      filter.country = { $regex: createMultiWordRegex(country) };
      console.log("🌍 Filtre ajouté - country :", filter.country);
    }
    if (category) {
      filter.category = { $regex: createMultiWordRegex(category) };
      console.log("🍽️ Filtre ajouté - category :", filter.category);
    }
    if (regime) {
      filter.regime = { $regex: createMultiWordRegex(regime) };
      console.log("🥗 Filtre ajouté - regime :", filter.regime);
    }
    if (ingredient) {
      filter["ingredients.name"] = { $regex: createMultiWordRegex(ingredient) };
      console.log("🥕 Filtre ajouté - ingredient :", filter["ingredients.name"]);
    }

    // Recherche de l'utilisateur si le pseudo est spécifié
    if (pseudo) {
      console.log("👤 Recherche de l'auteur :", pseudo);
      const user = await User.findOne({ username: { $regex: createMultiWordRegex(pseudo) } });
      console.log("👤 Auteur trouvé :", user);
      if (user) {
        filter.userRef = user._id;
        console.log("🔗 Filtre ajouté - userRef :", filter.userRef);
      } else {
        console.log("❌ Auteur non trouvé");
      }
    }

    // Affiche le filtre final avant la recherche
    console.log("🔍 Filtre final :", filter);

    // Recherche des recettes avec les filtres dynamiques
    const recipes = await Recipe.find(filter).populate("userRef", "username");

    // Affiche le nombre de recettes trouvées
    console.log("📜 Nombre de recettes trouvées :", recipes.length);

    // Si aucune recette n'est trouvée, on renvoie un message d'erreur
    if (recipes.length === 0) {
      console.log("❌ Aucune recette trouvée");
      return res.status(404).json({
        success: false,
        message: "Aucune recette trouvée pour les critères fournis.",
        statusCode: 404,
      });
    }

    // Retourner les résultats si des recettes sont trouvées
    console.log("✅ Envoi des résultats :", recipes);
    res.status(200).json({
      success: true,
      recipes,
    });
  } catch (error) {
    // Si une erreur survient, on l'affiche dans la console
    console.error("❌ Erreur dans la recherche :", error);
    next(error);
  }
};

*/



///////////////////////////////////////////////////////////////////////////
//  old Search et filtrer
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

    // 5. Recherche des recettes par nom, pays, modeCook ou userRef (si user trouvé)
    const recipes = await Recipe.find({
      $or: [
        { name: { $regex: searchRegex } },
        { country: { $regex: searchRegex } },
        { category: { $regex: searchRegex } },
        { regime: { $regex: searchRegex } },
        { modeCook: { $regex: searchRegex } }, // Ajout du filtre pour modeCook
        { "ingredients.name": { $regex: searchRegex } },
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




// @desc    Filter recipes by many critères & diplay one recipe on homeScreen
// @route   GET /api/recipes/filter?category=desserts&country=France
// @access  Public
export const filtreRecipe = async (req, res, next) => {
  try {
    // Récupérer les paramètres de requête
    const { name, country, category, regime, ingredient, pseudo, modeCook } = req.query;
    console.log(name, country, category, regime, ingredient, pseudo, modeCook);

    // Initialisation de l'objet filter
    let filter = {};

    // Ajouter des conditions au filtre si les critères sont fournis
    if (name) filter.name = { $regex: new RegExp(name, "i") };
    if (country) filter.country = { $regex: new RegExp(country, "i") };
    if (category) filter.category = { $regex: new RegExp(category, "i") };
    if (regime) filter.regime = { $regex: new RegExp(regime, "i") };
    if (ingredient) filter["ingredients.name"] = { $regex: new RegExp(ingredient, "i") };
    if (modeCook) filter.modeCook = { $regex: new RegExp(modeCook, "i") }; // Ajout du filtre pour modeCook

    // Recherche de l'utilisateur si le pseudo est spécifié
    if (pseudo) {
      const user = await User.findOne({ username: { $regex: new RegExp(pseudo, "i") } });
      if (user) {
        filter.userRef = user._id;
      }
    }

    // Recherche des recettes avec les filtres dynamiques
    const recipes = await Recipe.find(filter).populate("userRef", "username");

    if (recipes.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Aucune recette trouvée pour les critères fournis.",
        statusCode: 404,
      });
    }

    // Retourner les recettes filtrées
    res.status(200).json({
      success: true,
      recipes,
    });
  } catch (error) {
    next(error);
  }
};




/*
// Par soucis de réduire les requêtes elles ne sont pas utilisées
// Bien que fonctionnelles dans insomnia
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
*/