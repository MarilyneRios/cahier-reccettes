//ingredientController.js
import Ingredient from "../models/ingredientModel.js";
import { errorHandler } from "../utils/error.js";

// Création d'un ingrédient

export const createIngredient = async (req, res, next) => {
    try {
      // Log des données reçues dans la requête
      console.log("Request body:", req.body);
      console.log("Authenticated user:", req.user);
  
      // Vérifiez que le champ 'name' est présent dans la requête
      if (!req.body.name) {
        console.log("Validation error: 'name' field is missing.");
        return res.status(400).json({
          success: false,
          message: "The 'name' field is required.",
          statusCode: 400
        });
      }
  
      // Vérifiez que l'utilisateur est authentifié et que 'req.user' est présent
      if (!req.user || !req.user.id) {
        console.log("Validation error: User is not authenticated or user ID is missing.");
        return res.status(401).json({
          success: false,
          message: "User is not authenticated.",
          statusCode: 401
        });
      }
  
      // Créer un nouvel ingrédient avec les données reçues dans le corps de la requête
      const newIngredient = new Ingredient({
        name: req.body.name, // Champ requis
        image: req.body.image, // Optionnel
        recipes: req.body.recipes || [], // Optionnel
        user: req.user.id // Associer l'utilisateur authentifié à l'ingrédient
      });
  
      // Log de l'ingrédient avant sauvegarde
      console.log("New ingredient object:", newIngredient);
  
      // Enregistrer l'ingrédient dans la base de données
      const savedIngredient = await newIngredient.save();
  
      // Log de l'ingrédient après sauvegarde
      console.log("Saved ingredient:", savedIngredient);
  
      // Retourner l'ingrédient créé avec un statut 201 (Créé)
      res.status(201).json({
        success: true,
        data: savedIngredient,
        statusCode: 201
      });
    } catch (error) {
      // Log de l'erreur
      console.error("Error occurred:", error);
      // Passer l'erreur au middleware de gestion des erreurs
      next(error);
    }
  };
  
  

// afficher tous les ingrédients
export const displayIngredients = async (req, res, next) => {
    console.log("Request received for displaying ingredients");
  try {
    // Récupérer tous les ingrédients depuis la base de données
    const ingredients = await Ingredient.find().populate(
      "user",
      "username email"
    );

    // Définir manuellement l'en-tête Content-Type
    res.setHeader("Content-Type", "application/json");

    console.log("Response Content-Type:", res.getHeader("Content-Type"));

    // Renvoyer la réponse avec les ingrédients
    res.status(200).json(ingredients);
  } catch (error) {
    next(error);
  }
};

// Mise à jour du user = fonctionne
export const updateIngredient = async (req, res, next) => {
  try {
    const updatedIngredient = await Ingredient.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).populate("user", "username email");

    if (!updatedIngredient) {
      return res.status(404).json({ message: "Ingredient not found" });
    }

    res.status(200).json(updatedIngredient);
  } catch (error) {
    next(error);
  }
};

// Supprimer un ingredient = fonctionne
export const deleteIngredient = async (req, res, next) => {
  try {
    const deletedIngredient = await Ingredient.findByIdAndDelete(req.params.id);

    if (!deletedIngredient) {
      return res.status(404).json({ message: "Ingredient not found" });
    }

    res.status(200).json({ message: "Ingredient has been deleted..." });
  } catch (error) {
    next(error);
  }
};
