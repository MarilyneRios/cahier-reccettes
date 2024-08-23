import mongoose from "mongoose";

const { Schema } = mongoose;

// Définition du sous-document Instruction
const InstructionSchema = new Schema({
  step: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
  },
});

// Définition du sous-document Comment
const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Définition du Schéma recipe
const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true, //indexation du nom de la recette pour gain de temps
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
      min: 0, // Minimum making time = 0 minutes
    },
    cookingTime: {
      type: Number,
      min: 0, // Minimum cooking time = 0 minutes
    },
    imageUrl: {
      type: String,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference au User model
      required: true,
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0, // Minimum average rating of 0
      max: 10, // Maximum average rating of 10
    },
    ratingsCount: {
      type: Number,
      default: 0,
      min: 0, // Minimum ratings count of 0
    },
    ratingsSum: {
      type: Number,
      default: 0,
    },
    instructions: [InstructionSchema], // Sous-document pour les instructions
    comments: [commentSchema], // Sous-document pour les comments

    // Ingrédients liés via la collection RecipeIngredient
    ingredients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ingredient", // Références aux ingrédients
      },
    ],
  },
  { timestamps: true } // Ajoute automatiquement les champs createdAt et updatedAt
);

// Ajouter un index sur le champ "name"
recipeSchema.index({ name: 1 });

// Création du Modèle recipe
const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
