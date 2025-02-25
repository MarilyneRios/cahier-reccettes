// recipesApiSlice.js
import { apiSlice } from '../apiSlice';

const RECIPES_URL = '/api/recipes';

export const recipesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Nouvel endpoint pour le CRUD 
    addRecipe: builder.mutation({
      query: (Recipe) => ({
        url: `${RECIPES_URL}/`,
        method: 'POST',
        body: Recipe,
      }),
      invalidatesTags: ['Recipe'],
    }),

    // Afficher toutes les recettes avec la pagination
    displayAllRecipes: builder.query({
      query: ({ pageNumber = 1, pageSize = 6 }) => ({
        url: `${RECIPES_URL}/displayAllRecipes?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        method: 'GET',
      }),
      providesTags: ['Recipe'],
    }),
    displayOneRecipe: builder.query({
      query: (id) => ({
        url: `${RECIPES_URL}/displayOneRecipe/${id}`,
        method: 'GET',
      }),
      providesTags: ['Recipe'],
    }),
 
    updateRecipe: builder.mutation({
      query: ({ id, ...Recipes }) => ({
        url: `${RECIPES_URL}/updateRecipe/${id}`,
        method: 'PATCH',
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

  // Nouvel endpoint pour la recherche
  searchRecipes: builder.query({
    query: (query) => ({
      url: `${RECIPES_URL}/search/${query}`,
      method: 'GET',
    }),
    providesTags: ['Recipe'],
  }),

  // Nouvel endpoint pour filtrer par catégorie
  filterByCategory: builder.query({
    query: (category) => ({
      url: `${RECIPES_URL}/filter/category?category=${category}`,
      method: 'GET',
    }),
    providesTags: ['Recipe'],
  }),

  // Nouvel endpoint pour filtrer par régime
  filterByRegime: builder.query({
    query: (regime) => ({
      url: `${RECIPES_URL}/filter/regime?regime=${regime}`,
      method: 'GET',
    }),
    providesTags: ['Recipe'],
  }),
}),
  
});

export const {
  useAddRecipeMutation,  
  useDisplayAllRecipesQuery,
  useDisplayOneRecipeQuery,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
  useSearchRecipesQuery, 
  useFilterByCategoryQuery, 
  useFilterByRegimeQuery, 
} = recipesApiSlice;
