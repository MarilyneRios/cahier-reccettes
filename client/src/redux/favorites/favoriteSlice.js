import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorites: [],
  loading: false,
  error: null,
};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addFavoriteLocal: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavoriteLocal: (state, action) => {
      state.favorites = state.favorites.filter(fav => fav._id !== action.payload);
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
  },
});

export const { addFavoriteLocal, removeFavoriteLocal, setFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;
