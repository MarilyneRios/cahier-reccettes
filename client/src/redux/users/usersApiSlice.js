import { apiSlice } from "../apiSlice";

// l’URL de base pour les appels d’API liés à l'authentification
const AUTH_URL = "/api/auth";
// l’URL de base pour les appels d’API liés aux utilisateurs
const USERS_URL = "/api/user";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/signin`,
        method: "POST",
        body: data,
      }),
    }),
    signUp: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/signup`,
        method: "POST",
        body: data,
      }),
    }),
    signOut: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/signout`,
        method: "POST",
        body: data,
      }),
    }),
    googleSignIn: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/google`,
        method: "POST",
        body: data,
      }),
    }),
    //profilpage
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `${USERS_URL}/update/${id}`,
        method: "POST",
        body: data,
      }),
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `${USERS_URL}/delete/${id}`,
        method: "DELETE",
      }),
    }),
    getUserById: builder.query({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: "GET",
      }),
    }),
    //Vérification email et envoi questionSecret
    // Get : localhost:3000/api/auth/getUserByEmail?email=c@gmail.com
    getUserByEmail: builder.query({
      query: ({ email }) => ({
        url: `${AUTH_URL}/getUserByEmail`,
        method: "GET",
        params: { email },
      }),
    }),

    // Vérifie la réponse secrète à une question
    // POST /api/auth/verifyReponseSecret
    //JSON {"email": "c@gmail.com", "reponseSecret": "c@gmail.com"}
    verifyReponseSecret: builder.mutation({
      query: ({ email, reponseSecret }) => ({
        url: `${AUTH_URL}/verifyReponseSecret`,
        method: "POST",
        body: { email, reponseSecret },
      }),
    }),

    // envoie le mail avec lien pour resetPassword
    //  POST /api/auth/sendResetEmail
    //  Public
    resetPasswordRequest: builder.mutation({
      query: ({email}) => ({
        url: `${AUTH_URL}/sendResetEmail`,
        method: "POST",
        body: {email}, // { email: "adbcd@email.com" }
      }),
    }),
    
    // réinitialiser un mot de passe
    // le lien du mail => `http://localhost:5173/resetPassword/${userId}?token=${token}`;
    // le format Json attendu : {"email": "atigra.rios@gmail.com", "password": "NewPasswordInsomnia"}
    // POST /api/auth/resetPassword/USER_ID?token=XYZ
    // avec email et password dans le body
    //Public
    resetPassword: builder.mutation({
      query: ({ id, token, data }) => ({
        url: `${AUTH_URL}/resetPassword/${id}?token=${token}`,
        method: "POST",
        body: data,
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
  useGetUserByEmailQuery,
  useLazyGetUserByEmailQuery,
  useVerifyReponseSecretMutation,
  useResetPasswordRequestMutation,
  useResetPasswordMutation,
} = userApiSlice;
