import mongoose from 'mongoose';

// Définition du Schéma user
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
     // index: true, //indexation du username pour un gain de temps pour la recherche
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true, // Supprimer automatiquement les espaces en début et en fin de chaîne
      lowercase: true, 
    },
    password: {
      type: String,
      required: true,
    },
    questionSecret: {
      type: String,
      enum:[
        "Quel est le prénom de votre premier animal ?",
        "Quelle est votre ville de naissance ?",
        "Quel est le nom de votre plat préféré ?",
        "Quelle est votre couleur préférée ?",
        "Quel est le deuxième prénom de votre mère ?"
      ],
      required: true,
    },
    reponseSecret:{
      type: String,
      required: true,
    },
    savedRecipe: [{
      type: mongoose.Schema.Types.ObjectId, // Un tableau d'ObjectId pour sauvegarder plusieurs recettes
      ref: 'Recipe', 
    }],
    profilePicture: {
      type: String,
      default: 'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg',
    },
  },
  { timestamps: true } // Ajoute automatiquement les champs createdAt et updatedAt
);

// Ajouter un index sur le champ "username"
//userSchema.index({ username: 1 }); erreur apparu après fixauto dans console le 29 12 24

// Création du Modèle user
const User = mongoose.model('User', userSchema);

export default User;
