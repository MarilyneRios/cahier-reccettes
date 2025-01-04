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
  },
  currentRecipe: null,
  loading: false,
  error: false,
};

const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    setRecipe: (state, action) => {
      state.recipeInfo = {
        ...state.recipeInfo,
        ...action.payload, 
      };
    },
    resetRecipeInfo: (state) => {
      state.recipeInfo = initialState.recipeInfo;
    },
    setUserId: (state, action) => {
      state.recipeInfo.userId = action.payload;
    },
  },
});

export const { setRecipe, resetRecipeInfo,setUserId  } = recipeSlice.actions;

export default recipeSlice.reducer;
