import { apiSlice } from '../apiSlice';

const FAVORITES_URL = '/api/favoriteRecipes';

export const favoriteApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Récupérer toutes les recettes favorites avec pagination
    getAllFavoriteRecipes: builder.query({
        query: ({ pageNumber = 1, pageSize = 6 }) => ({
            url: `${FAVORITES_URL}/?pageNumber=${pageNumber}&pageSize=${pageSize}`,
            method: 'GET',  
        }),
        providesTags: ['Favorite'],
        }),
    // Ajouter une recette aux favoris
    addFavoriteRecipe: builder.mutation({
      query: (recipeId) => ({
        url: `${FAVORITES_URL}/add`,
        method: "POST",
        body: { recipeId },
      }),
      invalidatesTags: ["Favorite"],
    }),
     // Supprimer une recette des favoris
    removeFavoriteRecipe: builder.mutation({
      query: (recipeId) => ({
        url: `${FAVORITES_URL}/${recipeId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Favorite"],
    }),
      // Rechercher une recette favorite
      searchFavoriteRecipe: builder.query({
    query: (query) => ({
      url: `${FAVORITES_URL}/search/${query}`,
      method: 'GET',
    }),
    providesTags: ['Favorite'],
  }),
  }),
});

// Exporte les hooks auto-générés pour RTK Query
export const {
  useGetAllFavoriteRecipesQuery,
  useAddFavoriteRecipeMutation,
  useRemoveFavoriteRecipeMutation,
  useSearchFavoriteRecipeQuery, 
} = favoriteApiSlice;
