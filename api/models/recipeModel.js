import mongoose from "mongoose";

const { Schema } = mongoose;

// Définition du sous-document Ingredient avec quantité et unité
const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: String, required: true },
  unit: { type: String, required: true },
});

// Définition du Schéma recipe
const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    country: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    regime: {
      type: String,
      trim: true,
    },
    makingTime: {
      type: Number,
      min: 0,
    },
    cookingTime: {
      type: Number,
      min: 0,
    },
    imageUrl: {
      type: String,
      default: 'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg',
    },
     instructions: {
      type: [String], // Changez en tableau de chaînes
      required: true,
    },
    ingredients: { 
      type: [ingredientSchema],
      required: true 
    },
    comments: {
      type: [String], // Changez en tableau de chaînes
      default: [],
    },
    pseudo: { type: String, required: true },
    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);


// Création du Modèle recipe
const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
