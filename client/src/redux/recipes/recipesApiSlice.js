// recipesApiSlice.js
import { apiSlice } from '../apiSlice';

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

    // Afficher toutes les recettes avec la pagination
    displayAllRecipes: builder.query({
      query: ({ pageNumber = 1, pageSize = 6 }) => ({
        url: `${RECIPES_URL}/displayAllRecipes?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        method: 'GET',
      }),
      providesTags: ['Recipe'],
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

    oneRecipeAuth: builder.query({
      query: (id) => ({
        url: `${RECIPES_URL}/oneRecipeAuth/${id}`,
        method: 'GET',
      }),
      providesTags: ['Recipe'],
    }),
  }),
});

export const {
  useAddRecipeMutation,  
  useDisplayAllRecipesQuery,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
  useOneRecipeAuthQuery,
} = recipesApiSlice;
