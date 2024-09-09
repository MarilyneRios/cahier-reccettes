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

// Définition du sous-document Ingredient avec quantité et unité
const RecipeIngredientSchema = new Schema({
  ingredient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ingredient",
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    required: true // Par exemple : "gr", "ml", etc.
  }
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
    // Champ pour la note moyenne de la recette
    // Calculé automatiquement à partir des notes individuelles des utilisateurs
    averageRating: {
      type: Number,
      default: 0,
      min: 0, // Minimum average rating of 0
      max: 10, // Maximum average rating of 10
    },
     // Compteur des notes données par les utilisateurs
    // Permet de suivre le nombre total de notes pour une recette
    ratingsCount: {
      type: Number,
      default: 0,
      min: 0, // Minimum ratings count of 0
    },
    // Somme totale des notes reçues
    // Utilisée pour calculer la note moyenne (averageRating)
    ratingsSum: {
      type: Number,
      default: 0,
    },
    instructions: [InstructionSchema], // Sous-document pour les instructions
    comments: [commentSchema], // Sous-document pour les comments

    // Ingrédients liés via un sous document avec quantité et unité
    ingredients: [RecipeIngredientSchema], 
    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    //relation entre les recettes et le user
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Ajoute automatiquement les champs createdAt et updatedAt
);



// Création du Modèle recipe
const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;

/*
Lorsque tu veux récupérer une recette avec ses ingrédients,
 tu feras des **populate** sur le champ ingredients 
pour obtenir les détails complets des ingrédients associés à la recette, y compris les quantités et les unités.
*/