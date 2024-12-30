import { createSlice } from '@reduxjs/toolkit';

// Initialisation de l'état initial pour le slice Redux
const initialState = {
  recipeInfo: {
    _id: "",
    name: "",
    country: "",
    category: "",
    regime: "",
    ingredients: [],
    instructions: [],
    makingTime: 0, // Initialisé à 0 plutôt que "" pour éviter des erreurs de type
    cookingTime: 0, // Initialisé à 0 plutôt que "" pour éviter des erreurs de type
    comments: [],
    pseudo: "",
    imageUrl: "",
    userId: null, // Pas de récupération depuis localStorage
  }
};

const recipeSlice = createSlice({
    name: 'recipe',
    initialState,
    reducers: {
      // Définir les infos de la recette + mise à jour dans l'état
      setRecipe: (state, action) => {
        state.recipeInfo = action.payload;
      },
  
      // Réinitialiser RecipeInfo
      resetRecipeInfo: (state) => {
        state.recipeInfo = initialState.recipeInfo;
      },
    },
  });

export const { setRecipe, resetRecipeInfo } = recipeSlice.actions;

export default recipeSlice.reducer;
