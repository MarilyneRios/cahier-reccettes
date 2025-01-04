//recipesApiSlice
import { apiSlice } from '../apiSlice';

// l’URL de base pour les appels d’API liés aux recipes de index.js (app.use('/api/recipes', recipesRoutes);)
const RECIPES_URL = '/api/recipes';

export const recipesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addRecipe: builder.mutation({
      query: (Recipe) => ({
        url: `${RECIPES_URL}/`,
        method: 'POST',
        body: Recipe,
      }),
      invalidatesTags: ['Recipe'],
    }),


    updateRecipe: builder.mutation({
      query: ({ id, ...Recipes }) => ({
        url: `${RECIPES_URL}/updateRecipe/${id}`,
        method: 'PUT',
        body: Recipes,
      }),
      invalidatesTags: ['Recipe'],
    }),
    deleteRecipe: builder.mutation({
      query: (id) => ({
        url: `${RECIPES_URL}/deleteRecipe/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Recipe'],
    }),
    allRecipesAuth: builder.query({
      query: () => ({
        url: `${RECIPES_URL}/allRecipesAuth`,
        method: 'GET',
      }),
      providesTags: ['Recipe'],
    }),
    oneRecipeAuth: builder.query({
      query: (id) => ({
        url: `${RECIPES_URL}/oneRecipeAuth/${id}`,
        method: 'GET',
      }),
      providesTags: ['Recipe'],
    }),
    viewRecipeAuth: builder.query({
      query: (id) => ({
        url: `${RECIPES_URL}/viewRecipeAuth/${id}`,
        method: 'GET',
      }),
      providesTags: ['Recipe'],
    }),
    searchRecipe: builder.query({
      query: (query) => ({
        url: `${RECIPES_URL}/searchRecipe/${query}`,
        method: 'GET',
      }),
    }),
    filterRecipe: builder.query({
      query: (category) => ({
        url: `${RECIPES_URL}/filterRecipe/${category}`,
        method: 'GET',
      }),
      invalidatesTags: ['Recipe'],
    }),
    allRecipesFavorite: builder.query({
      query: () => ({
        url: `${RECIPES_URL}/allRecipesFavorite`,
        method: 'GET',
      }),
      providesTags: ['Recipe'],
    }),
    oneRecipesFavorite: builder.query({
      query: (id) => ({
        url: `${RECIPES_URL}/oneRecipesFavorite/${id}`,
        method: 'GET',
      }),
      providesTags: ['Recipe'],
    }),
    addRecipeFavorite: builder.mutation({
      query: (id) => ({
        url: `${RECIPES_URL}/addRecipeFavorite/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['Recipe'],
    }),
    removeRecipeFavorite: builder.mutation({
      query: (id) => ({
        url: `${RECIPES_URL}/removeRecipeFavorite/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Recipe'],
    }),
  }),
});

export const {
  useAddRecipeMutation,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,

  useAllRecipesAuthQuery,
  useOneRecipeAuthQuery,
  useViewRecipeAuthQuery,

  useSearchRecipeQuery,
  useFilterRecipeQuery,
  
  useAllRecipesFavoriteQuery,
  useOneRecipesFavoriteQuery,
  useAddRecipeFavoriteMutation,
  useRemoveRecipeFavoriteMutation,
} = recipesApiSlice;