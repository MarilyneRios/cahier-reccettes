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
          url: `${FAVORITES_URL}/search?query=${encodeURIComponent(query)}`,
          method: 'GET',
        }),
        providesTags: ['Favorite'],
      }),
      
 
  //filtrer les recettes favorites
  //exemple requete insomnia
  // ex : http://localhost:3000/api/favoriteRecipes/filterFavorite?regime=traditionnelle&conutry=france
  //  ou http://localhost:3000/api/favoriteRecipes/filterFavorite?regime=traditionnelle...
  filterFavorisRecipes: builder.query({
    query: (params = {}) => {
      // Si des paramètres sont passés, on crée la query string
      const queryString = new URLSearchParams(params).toString();
      
      // Assure-toi que la query string est bien formée
      console.log(`URL Request: ${FAVORITES_URL}/filterFavorite?${queryString}`);
      
      return {
        url: `${FAVORITES_URL}/filterFavorite?${queryString}`,
        method: "GET",
      };
    },
    // L'utilisation de "providesTags" permet de fournir des tags pour la gestion du cache
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
  useLazyFilterFavorisRecipesQuery,
} = favoriteApiSlice;
