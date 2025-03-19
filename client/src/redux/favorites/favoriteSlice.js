import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
  currentFavorite: null,
  loading: false,
  error: false,
  //searchBar
  searchResults: [],
  searchTerm: "",
    // filter
    filteredResults: [],
    selectedCategories: [],
    selectedRegimes: [],
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addFavoriteLocal: (state, action) => {
      if (!state.favorites.some((fav) => fav._id === action.payload._id)) {
        state.favorites.push(action.payload);
      }
    },
    removeFavoriteLocal: (state, action) => {
      state.favorites = state.favorites.filter(
        (fav) => fav._id !== action.payload
      );
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    setFavoriteRecipe: (state, action) => {
      state.currentFavorite = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setFavoriteSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setSelectedCategories: (state, action) => {
      state.selectedCategories = action.payload;
    },
    setSelectedRegimes: (state, action) => {
      state.selectedRegimes = action.payload;
    },
    setFilteredResults: (state, action) => {
      state.filteredResults = action.payload;
    },
  },
});

export const {
  addFavoriteLocal,
  removeFavoriteLocal,
  setFavorites,
  setFavoriteRecipe,
  setLoading,
  setError,
  setFavoriteSearchResults,
} = favoriteSlice.actions;

export default favoriteSlice.reducer;
