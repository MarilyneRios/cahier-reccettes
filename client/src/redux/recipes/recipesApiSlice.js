import { apiSlice } from "../apiSlice";

const RECIPES_URL = "/api/recipes";

export const recipesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Ajouter une recette
    addRecipe: builder.mutation({
      query: (recipe) => ({
        url: `${RECIPES_URL}/`,
        method: "POST",
        body: recipe,
      }),
      invalidatesTags: ["Recipe"],
    }),

    // Afficher toutes les recettes avec pagination
    displayAllRecipes: builder.query({
      query: ({ pageNumber = 1, pageSize = 6 }) => ({
        url: `${RECIPES_URL}/?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        method: "GET",
      }),
      providesTags: ["Recipe"],
    }),

    // Afficher une recette
    displayOneRecipe: builder.query({
      query: (id) => ({
        url: `${RECIPES_URL}/displayOneRecipe/${id}`,
        method: "GET",
      }),
      providesTags: ["Recipe"],
    }),

    // Modifier une recette
    updateRecipe: builder.mutation({
      query: ({ id, ...recipe }) => ({
        url: `${RECIPES_URL}/updateRecipe/${id}`,
        method: "PATCH",
        body: recipe,
      }),
      invalidatesTags: ["Recipe"],
    }),

    // Supprimer une recette
    deleteRecipe: builder.mutation({
      query: (id) => ({
        url: `${RECIPES_URL}/deleteRecipe/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Recipe"],
    }),

    // Rechercher une recette par terme
    searchRecipes: builder.query({
      query: (query) => ({
        url: `${RECIPES_URL}/search/${query}`,
        method: "GET",
      }),
      providesTags: ["Recipe"],
    }),

    // Filtrer les recettes selon critères
   // ex de requete : get: http://localhost:3000/api/recipes/filter?regime=traditionnelle&modeCook=aucun
    filterRecipes: builder.query({
      query: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        console.log(`URL Request: ${RECIPES_URL}/filter?${queryString}`);
        return {
          url: `${RECIPES_URL}/filter?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["Recipe"],
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
  useFilterRecipesQuery,
  useLazyFilterRecipesQuery,
} = recipesApiSlice;
