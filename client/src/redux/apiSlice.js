/*
import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

// URL de base pour toutes les requêtes
const baseQuery = fetchBaseQuery({ baseUrl: '' });

// Création de l'API Slice
export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({}),
});
*/

import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: '' // ou met ici ta baseUrl si tu as besoin d'une valeur par défaut
});

const baseQueryWithAuth = async (args, api, extraOptions) => {
  const token = api.getState().user.currentUser?.accessToken;
  const result = await baseQuery({
    ...args,
    headers: {
      ...args.headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  }, api, extraOptions);
  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['User'],
  endpoints: (builder) => ({}),
});
