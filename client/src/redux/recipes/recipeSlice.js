import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipeInfo: {
    _id: "",
    name: "",
    country: "",
    category: "",
    regime: "",
    ingredients: [],
    instructions: [],
    makingTime: 0,
    cookingTime: 0,
    comments: [],
    pseudo: "",
    imageUrl: "",
    userId: null,
  },
  currentRecipe: null,
  loading: false,
  error: false,
  // searchBar
  searchResults: [],
  searchTerm: "",
  // filter
  filteredResults: [],
  selectedCategory: [],
  selectedRegime: [],
  selectedModecook: [],
  searchTermCountry: "",
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
      console.log("Setting search results:", action.payload); 
      state.searchResults = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSelectedRegime: (state, action) => {
      state.selectedRegime = action.payload;
    },
    setSelectedModecook: (state, action) => {
      state.selectedModecook = action.payload;
    },
    setSearchTermCountry: (state, action) => {
      state.searchTermCountry = action.payload;
    },
    setFilteredResults: (state, action) => {
      console.log("Action setFilteredResults received with payload:", action.payload);
      state.filteredResults = action.payload;
    },
    resetFilters: (state) => {
      console.log("Action resetFilters received");
      state.selectedCategory = [];
      state.selectedRegime = [];
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
  setSelectedRegime,
  setSelectedCategory,
  setSelectedModecook,
  setSearchTermCountry,
  setFilteredResults,
  resetFilters,
} = recipeSlice.actions;

export default recipeSlice.reducer;
