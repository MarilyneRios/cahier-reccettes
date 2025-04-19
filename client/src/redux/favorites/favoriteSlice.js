import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
  currentFavorite: null,
  loading: false,
  error: false,
  //searchBar
  searchFavoriteResults: [],
  searchFavoriteTerm: "",
  // filter
  filteredFavoriteResults: [],
  selectedFavoriteCategory: [],
  selectedFavoriteRegime: [],
  selectedFavoriteModecook: [],
  searchFavoriteTermCountry: "",
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
    setFavoriteLoading: (state, action) => {
      state.loading = action.payload;
    },
    setFavoriteError: (state, action) => {
      state.error = action.payload;
    },
    setFavoriteSearchResults: (state, action) => {
      state.searchFavoriteResults = action.payload;
    },
    setSelectedFavoriteCategory: (state, action) => {
      state.selectedFavoriteCategory = action.payload;
    },
    setSelectedFavoriteRegime: (state, action) => {
      state.selectedFavoriteRegime = action.payload;
    },
    setSelectedFavoriteModecook: (state, action) => {
      state.selectedFavoriteModecook = action.payload;
    },
    setSearchFavoriteTermCountry: (state, action) => {
      state.searchFavoriteTermCountry = action.payload;
    },
   // setFilteredFavoriteResults: (state, action) => {
   //   state.filteredFavoriteResults = action.payload;
   // },
    resetFavoriteFilters: (state) => {
      state.selectedFavoriteCategory = [];
      state.selectedFavoriteRegime = [];
      state.selectedFavoriteModecook = [];
      state.searchFavoriteTermCountry = "";
    }
    
  },
});

export const {
  addFavoriteLocal,
  removeFavoriteLocal,
  setFavorites,
  setFavoriteRecipe,
  setFavoriteLoading,
  setFavoriteError,
  setFavoriteSearchResults,
  setSelectedFavoriteCategory,
  setSelectedFavoriteRegime,
  setSelectedFavoriteModecook,
  setSearchFavoriteTermCountry,
  setFilteredFavoriteResults,
  resetFavoriteFilters,
} = favoriteSlice.actions;


export default favoriteSlice.reducer;
