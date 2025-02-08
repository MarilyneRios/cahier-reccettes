import { apiSlice } from '../apiSlice';

const FAVORITES_URL = '/api/favoriteRecipes';

export const favoriteApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFavorites: builder.query({
      query: () => ({
        url: `${FAVORITES_URL}/`,
        method: 'GET',
      }),
      providesTags: ['Favorite'],
    }),
    addFavorite: builder.mutation({
      query: (recipeId) => ({
        url: `${FAVORITES_URL}/add`,
        method: 'POST',
        body: { recipeId },
      }),
      invalidatesTags: ['Favorite'],
    }),
    removeFavorite: builder.mutation({
      query: (recipeId) => ({
        url: `${FAVORITES_URL}/${recipeId}`,
        method: 'DELETE',
        body: { recipeId },
      }),
      invalidatesTags: ['Favorite'],
    }),
  }),
});

// Exporte les hooks auto-générés pour RTK Query
export const {
  useGetFavoritesQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} = favoriteApiSlice;
