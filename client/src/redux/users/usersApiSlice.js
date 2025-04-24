import { apiSlice } from '../apiSlice';

// l’URL de base pour les appels d’API liés à l'authentification
const AUTH_URL = '/api/auth';
// l’URL de base pour les appels d’API liés aux utilisateurs
const USERS_URL = '/api/user';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/signin`,
        method: 'POST',
        body: data,
      }),
    }),
    signUp: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/signup`,
        method: 'POST',
        body: data,
      }),
    }),
    signOut: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/signout`,
        method: 'POST',
        body: data,
      }),
    }),
    googleSignIn: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/google`,
        method: 'POST',
        body: data,
      }),
    }),
    //profilpage et forgotPassword
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `${USERS_URL}/update/${id}`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteUser: builder.mutation({
      query: ({ id}) => ({
        url: `${USERS_URL}/delete/${id}`,
        method: 'DELETE',
       
      }),
    }),
    getUserById: builder.query({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: 'GET',
      })
    }),
    //Vérification email et envoi questionSecret
    // Get : localhost:3000/api/auth/getUserByEmail?email=test3@gmail.com
    getUserByEmail: builder.query({
      query: (email) => ({
        url: `${AUTH_URL}/getUserByEmail`,
        method: 'GET',
        params: { email },
      }),
    }),
    
    
    
  }),
});

// attention par convention le nom est "use+Nom+Mutation"
export const {
  useSignInMutation,
  useSignUpMutation,
  useSignOutMutation,
  useGoogleSignInMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUserByIdQuery, 
  useGetUserByEmailQuery 
} = userApiSlice;
