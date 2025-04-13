import { createSlice } from "@reduxjs/toolkit";

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
  // searchBar
  searchResults: [],
  searchTerm: "",
  // filter
  filteredResults: [],
  selectedCategories: [],
  selectedRegimes: [],
};

const recipeSlice = createSlice({
  name: "recipe",
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
    setCurrentRecipe: (state, action) => {
      state.currentRecipe = action.payload;
    },
    setSearchResults: (state, action) => {
      //pour transmettre les recherches au back
      state.searchResults = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedCategories: (state, action) => {
      state.selectedCategories = action.payload;
    },
    setSelectedRegimes: (state, action) => {
      state.selectedRegimes = action.payload;
    },
    setSelectedModecook: (state, action) => {
      state.selectedModecook = action.payload;
    },
    setSearchTermCountry: (state, action) => {
      state.searchTermCountry = action.payload;
    },
    setFilteredResults: (state, action) => {
      // Ajouté pour gérer les résultats filtrés
      state.filteredResults = action.payload;
    },
    resetFilters: (state) => {
      state.selectedCategories = [];
      state.selectedRegimes = [];
      state.selectedModecook = [];
      state.searchTermCountry = "";
    },
  },
});

export const {
  setRecipe,
  resetRecipeInfo,
  setUserId,
  setCurrentRecipe,
  setSearchResults,
  setSearchTerm,
  setSelectedRegimes,
  setSelectedCategories,
  setSelectedModecook,
  setSearchTermCountry,
  setFilteredResults,
  resetFilters,
} = recipeSlice.actions;

export default recipeSlice.reducer;
