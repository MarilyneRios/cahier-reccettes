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
    modeCook: {
      type: String,
      enum: [
        "vapeur",
        "airFryer",
        "griller",
        "four",
        "autoCuiseur",
        "déshydrater",
        "sauté",
        "mijoter",
        "bouillir",
        "rôtir",
        "pocher",
        "frire",
        "autres",
      ],
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: [
        "aperitifs",
        "entrees",
        "plats",
        "desserts",
        "boissons",
        "salades",
        "autres",
      ],
      required: true,
      trim: true,
    },
    regime: {
      type: String,
      enum: [
        "traditionnelle",
        "vegetarien",
        "vegan",
        "sans-gluten",
        "sans-lactose",
        "autres",
      ],
      required: true,
      trim: true,
    },
    makingTime: {
      type: Number,
      min: -1,
    },
    cookingTime: {
      type: Number,
      min: -1,
    },
    piece: {
      type: Number,
      min: -1,
    },
    imageUrl: {
      type: String,
      default:
        "https://firebasestorage.googleapis.com/v0/b/cahier-recette.appspot.com/o/1736092969670homeBg2.png?alt=media&token=86b7c025-6e2a-4bc4-be65-36ef1083c75c",
    },
    instructions: {
      type: [String], // Changez en tableau de chaînes
      required: true,
    },
    ingredients: {
      type: [ingredientSchema],
      required: true,
    },
    comments: {
      type: [String], // Changez en tableau de chaînes
      default: [],
    },
    commentsRecipe: {
      type: [String],
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
