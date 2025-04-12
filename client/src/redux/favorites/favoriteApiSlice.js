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
      query: ({ userId, recipeId }) => ({
        url: `${FAVORITES_URL}/add`,
        method: "POST",
        body: { userId, recipeId },
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
 
  //filtrer les recettes favorites
  //exemple requete insomnia
  //http://localhost:3000/api/favoriteRecipes/filterFavorite?category=plats&country=italie
  filterFavorisRecipes: builder.query({
    query: (params) => {
      const queryString = new URLSearchParams(params).toString();
      return {
        url: `${FAVORITES_URL}/filterFavorite?${queryString}`,
        method: "GET",
      };
    },
    providesTags: ["Favorite"],
  }),
}),
});

// Exporte les hooks auto-générés pour RTK Query
export const {
  useGetAllFavoriteRecipesQuery,
  useAddFavoriteRecipeMutation,
  useRemoveFavoriteRecipeMutation,
  useSearchFavoriteRecipeQuery, 
  useFilterFavorisRecipesQuery,
} = favoriteApiSlice;
