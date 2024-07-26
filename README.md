# Auth-React-Bootstrap-RKT-Query

# Côté client / frontend

git clone https://github.com/MarilyneRios/auth-React-Bootstrap.git

- cd client
- npm install vite --save-dev
- npm install lru-cache @eslint/config-array rimraf@latest glob@latest @eslint/object-schema
- npm install
- npm run dev

Bootstrap :
> npm install react-bootstrap bootstrap
> npm install react-icons --save
> npm install bootstrap

Navigation :
> npm i react-router-dom 

Redux : 
> npm install @reduxjs/toolkit 
> npm install react-redux
> npm install redux-persist

Firebase google :
> npm install firebase

Build : ?????????????????????????????????????????????

> npm run build ?????????????????????????????????????



# Créer le Server/ Backend


- npm install express --save
- npm install -g nodemon (s'il n'est pas déjà présent sur votre ordi)

- npm install dotenv --save
- npm install mongoose
- npm install bcryptjs
- npm install jsonwebtoken
- npm i cookie-parser 

## Cacher les données sensibles

1. touch .env à la racine

````
PORT=3000
VITE_DB_CONNECTION_STRING="votre lien de connexion mongoDB/nom_de_App"
JWT_SECRET="votre clé de cryptage"
````

## Pour lancer le serveur à la racine du projet : 
- 1/ si vous avez installer nodemon (https://www.npmjs.com/package/nodemon) => nodemon api/index.js 
- 2/ sinon => node api/index.js

## MongoDb

Créer une BDD pour votre App.
----------------------------------------------------------------------------------------------------------------------

# réglage côté client

## Firebase google :

https://console.firebase.google.com/

1. créer un compte et récupérer les codes

- Créez un projet sur Firebase.
- Nommez le projet ‘Auth-React-Bootstrap-RTK-Query’.
- Désactivez Google Analytics pour ce projet (projet d’entraînement).
- continuer
-Cliquez sur “</>” pour enregistrer l’application.
- Donnez à l’application le pseudonyme ‘Auth-React-Bootstrap-RTK-Query’.
- Enregistrer l'application

- **Installez Firebase** côté client en utilisant la commande : **npm install firebase**. si ce n'est pas déjà fait.

2. **Créez un fichier .env dans le répertoire client** et ajoutez-y les **informations sensibles**

````
VITE_FIREBASE_APIKEY=....
VITE_FIREBASE_AUTHDOMAIN=....
VITE_FIREBASE_PROJECTID=....
VITE_FIREBASE_STORAGEBUCKET=...
VITE_FIREBASE_MESSAGERIESENDERID=...
VITE_FIREBASE_APPID=...
````
- Sur Firebase, allez dans ‘Authentication’, choisissez ‘Google’ et activez-le.
- cliquer sur activer
- Méthode de connexion :
> Nom public du projet : Auth-React-Bootstrap-RTK-Query
> votre email
- Sauvegardez les modifications.
- Dans les paramètres, allez à ‘Association de comptes utilisateur’. Dans l’onglet ‘Domaine autorisé’, ‘localhost’ est par défaut. **Notez que lorsque vous déploierez l’application, vous devrez ajouter l’URL**.

3. Storage Firebase :

- Build ou créer un espace de stockage sur Firebase.

- storage

- get started ou commencer

- set up cloud storage ou Configurer cloud storage:

> start in production mode ou Démarrer en mode de production + next ou ok

> choisir un emplacement proche + done ou ok

> Configurez les règles de votre stockage comme suit : 

````
rules_version = '2';

// Craft rules based on data in your Firestore database
// allow write: if firestore.get(
//    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read;
      allow write: if
      request.resource.size < 2 * 1024 * 1024 &&
      request.resource.contentType.matches('image/.*')
    }
  }
}
````
+ Publiez ces règles. 

**Ces règles permettent à tous les utilisateurs de lire tous les fichiers.** 

Elles permettent également aux utilisateurs de télécharger des fichiers si deux conditions sont remplies :

-> **allow read;** : Cette règle permet à tous les users de lire tous les fichiers.

-> **allow write: if request.resource.size < 2 _ 1024 _ 1024 && request.resource.contentType.matches('image/.*')** : Cette règle permet aux users d’écrire (télécharger) des fichiers si deux conditions sont validées :

- ps : La taille du fichier est inférieure à 2 Mo (2 _ 1024 _ 1024 octets).
Le type de contenu du fichier correspond à une image.
Récupérer les images dans notre App

=> Pour récupérer les images dans votre application, vous devrez utiliser les API appropriées fournies par Firebase.
----------------------------------------------------------------------------------------------------------------------


## Render

1. + New > web service

2. Sélectioner le dossier

3. Remplir

> Name: mern-auth-boostrap-RTK-Query 
> Region: sélectionner la plus proche
> Branch: main 
> Root Directory :
> Runtime: Node Build 
> Command: npm run build 
> Command: npm start

> variables env:

- PORT
- VITE_DB_CONNECTION_STRING
- JWT_SECRET
- VITE_FIREBASE_APIKEY
- ...

tester 5 min après le temps que tout soit disponible en ligne

### Firebase

> Authentication

> Domaines autorisés

> Ajouter un domaine# Auth-React-Bootstrap-RTK-Query


### Test thunderClient : 

{ "username": "user2", "email":"user2@email.com", "password": "user2@email.com" }

//////////////////////////////////////////////////////////////////////////////////

### Changement titre 

1. index.html

2. Header.jsx

3. Modification du Home et About


# Ajout de RTK query

https://redux-toolkit.js.org/rtk-query/usage/queries

https://redux.js.org/tutorials/essentials/part-7-rtk-query-basics

https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced

## store.js

Ajout de devTools :

https://developer.chrome.com/docs/devtools?hl=fr

https://developer.chrome.com/docs/devtools/tips?hl=fr

````
devTools:true
````

````
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// importation les reducers
import userReducer from "./userSlice.js"; 


const rootReducer = combineReducers({
  user: userReducer,
  
  // Ajoutez les autres reducers ici
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
    devTools:true
});

export const persistor = persistStore(store);
````

## userSlice.js

````
// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signOut: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    updateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  signOut,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
````

## apiSlice.js

 Pour définir une base pour les requêtes HTTP, avec les types de tags pour le cache et prépare l'endroit où vous ajouterez les endpoints de votre API.


- **fetchBaseQuery** : Une fonction de Redux Toolkit Query pour effectuer des requêtes HTTP de base (GET, POST, PUT, DELETE...).

- **createApi** : Une fonction pour créer une API slice  avec des endpoints définis pour effectuer des requêtes.

- **baseQuery** : Déclare la base de la requête en utilisant fetchBaseQuery.

- **baseUrl** : Définit l'URL de base pour toutes les requêtes
````
import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: '' });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({}),
});
````

### store.js

Intégrer apiSlice:

- importation des reducers pour user et apiSlice.

- Combinez les reducers dans rootReducer, en incluant le apiSlice.reducer avec sa clé spécifique. C'est à dire : Combiner tous vos reducers en un seul root reducer (le user reducer et le apiSlice reducer).

- Ajouter le middleware de apiSlice.
````
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// importation les reducers
import userReducer from "./userSlice.js"; 
import { apiSlice } from './apiSlice.js';


const rootReducer = combineReducers({
  user: userReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  // Ajoutez les autres reducers ici
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false, }).concat(apiSlice.middleware), 
    devTools:true
});

export const persistor = persistStore(store);
````

### usersApiSlice.js

Nous aurons tous les pendpoints pour lier le frontend avec le backend  en utilisant createApi de Redux Toolkit Query,.

````
import { apiSlice } from './apiSlice';

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
      query: () => ({
        url: `${AUTH_URL}/signout`,
        method: 'GET',
      }),
    }),
    googleSignIn: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/google`,
        method: 'POST',
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `${USERS_URL}/update/${id}`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/delete/${id}`,
        method: 'DELETE',
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
} = userApiSlice;

````