import { apiSlice } from '../apiSlice';

const FAVORITES_URL = '/api/favoriteRecipes';

export const favoriteApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Afficher toutes les recettes avec la pagination
    getAllFavoriteRecipes: builder.query({
        query: ({ pageNumber = 1, pageSize = 6 }) => ({
            url: `${FAVORITES_URL}/?pageNumber=${pageNumber}&pageSize=${pageSize}`,
            method: 'GET',  
        }),
        providesTags: ['Favorite'],
        }),
    addFavoriteRecipe: builder.mutation({
      query: (recipeId) => ({
        url: `${FAVORITES_URL}/add`,
        method: "POST",
        body: { recipeId },
      }),
      invalidatesTags: ["Favorite"],
    }),
    removeFavoriteRecipe: builder.mutation({
      query: (recipeId) => ({
        url: `${FAVORITES_URL}/${recipeId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Favorite"],
    }),
  }),
});

// Exporte les hooks auto-générés pour RTK Query
export const {
  useGetAllFavoriteRecipesQuery,
  useAddFavoriteRecipeMutation,
  useRemoveFavoriteRecipeMutation,
} = favoriteApiSlice;
