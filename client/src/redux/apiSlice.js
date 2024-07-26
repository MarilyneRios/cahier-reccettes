import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

// URL de base pour toutes les requêtes
const baseQuery = fetchBaseQuery({ baseUrl: '' });

// Création de l'API Slice
export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({}),
});