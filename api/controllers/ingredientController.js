//ingredientController.js
import Ingredient from "../models/ingredientModel.js";
import { errorHandler } from "../utils/error.js";

// création d'un ingrédient
export const createIngredient = async (req, res, next) => {};

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
