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

## fonctionnalité avec RTK Query


ps: Lorsque tu utilises RTK Query pour effectuer des appels API avec des mutations.
**pas besoin** d'utiliser **await res.json()**. 

- **RTK Query gère déjà la conversion** de la réponse de l'API **en JSON**. 

> RTK Query retourne directement les données JSON sous forme d'objet JavaScript avec **.unwrap()**.
Cela simplifie le code en évitant la nécessité de convertir la réponse en JSON manuellement et de gérer les erreurs de conversion.

> Gestion des Erreurs :
  **.unwrap()** lance **une exception si la requête échoue**, ce qui te permet de gérer les erreurs dans le bloc **catch**.

> Cela rend ton code plus propre et réduit les risques d'erreurs liées à la manipulation des réponses HTTP.

### SignIn.jsx

````
//.....
// Importation de useSignInMutation:
import { useSignInMutation } from "../redux/usersApiSlice";

export default function SignIn() {
  // les états
  const [formData, setFormData] = useState({});
  const [visiblePassword, setVisiblePassword] = useState(false);

  // Accès à l'état de chargement et d'erreur depuis Redux
  const { loading, error } = useSelector((state) => state.user);

  // hook de navigation
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Déclaration RTK Query du hook useSignInMutation pour sign-in
  const [signIn] = useSignInMutation();
  
  // Gérer les modifications d'entrée et mettre à jour l'état des données du formulaire
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    //s'assurer que les champs soient remplis
    if (!formData.email || !formData.password) {
      dispatch(signInFailure("Veuillez remplir tous les champs."));
      return;
    }

    try {
      dispatch(signInStart());
      // Vérifie si signIn est une fonction avant de l'appeler
      if (typeof signIn === 'function') {
        // Effectue la mutation de connexion à l'aide de la requête RTK
        console.log("Envoi des données de connexion:", formData);
        const res = await signIn(formData).unwrap();
        console.log("Réponse de la mutation:", res);

        // Recherche d'erreurs dans la réponse
        if (res.success === false) {
          const errorMessage = translateErrorMessage(res.message);
          console.log("Message d'erreur traduit:", errorMessage);
          dispatch(signInFailure(errorMessage));
          return;
        }

        // dispatch l'action de réussite avec les données de réponse
        dispatch(signInSuccess(res));

        // Navigate to Home.jsx si connexion réussie avec sign-in
        navigate("/");
      } else {
        console.log("signIn n'est pas une fonction:", signIn);
        dispatch(signInFailure("Erreur interne, veuillez réessayer."));
      }
    } catch (error) {
      console.log("Erreur lors de la connexion:", error);
      dispatch(signInFailure("Le mot de passe ou l'email est incorrect, veuillez réessayer.")); // Message générique
    }
  };
  
  // Fonction pour traduire les messages d'erreur
  const translateErrorMessage = (message) => {
    const errorTranslations = {
      "Invalid email or password": "Email ou mot de passe invalide",
      "User not found": "Utilisateur non trouvé",
      "wrong credentials":"Le mot de passe ou l'email est incorrect",
    };
    return errorTranslations[message] || "Une erreur est survenue, veuillez réessayer.";
  };
  //......
}

````

> J'ai oublié de mettre les [] et j'ai rencontré une erreur:

**const [signIn] = useSignInMutation();** Bien mettre les **[]** sinon vous avez une erreur qui indique que **signIn n'est pas une fonction**.

- C'est pour cela que j'ai ajouté une vérification avant d'appeler signIn :

````
if (typeof signIn === 'function') {
  // Appel de signIn et traitement de la réponse
} else {
  console.log("signIn n'est pas une fonction:", signIn);
  dispatch(signInFailure("Erreur interne, veuillez réessayer."));
}
````
- des console.log pour trouver d'où venait l'erreur :

````
console.log("Envoi des données de connexion:", formData);
const res = await signIn(formData).unwrap();
console.log("Réponse de la mutation:", res);

````

### Profile.jsx

#### bug signout

````
router.post('/signout', signout);

````

au lieu de 

````
router.get('/signout', signout);

````
#### fonction signOut

1. retirer le dispatch signOut de "../redux/userSlice";

2. modifier coanst handleSignout

````
  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/signout');
     // dispatch(signOut())
    } catch (error) {
      console.log(error);
    }
  };
````

3. Modifier usersApiSlice.js

````
  signOut: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/signout`,
        method: 'POST',
        body: data,
      }),
    }),
````    

4. Modifier userSlice.js

supprimer :

````
  signOut: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
  },
````

#### fonction signUp

1. importation

````
// Importation de useSignInMutation:
import { useSignUpMutation } from "../redux/usersApiSlice";
````

2. Déclaration RTK Query du hook useSignInMutation pour sign-up
````
 const [signUp] = useSignUpMutation();
````

3. La mutation pour signUp via RTK dans handleSubmit

````
try {
      // Active l'état de chargement
      setLoading(true);
      // Réinitialise le message d'erreur pour éliminer les messages précédents.
      setError("");
      
      // Vérifie si `signUp` est bien une fonction, puis tente de l'exécuter.
      if (typeof signUp === "function") {
        // La mutation pour l'inscription via RTK Query et ".unwrap();" => attend la réponse
        const res = await signUp(formData).unwrap();
        // Déasctive l'état de chargement
        setLoading(false);

        // Si échec de l'inscription
        if (res.success === false) {
          setError("Le Pseudo ou l'email est déjà utilisé!");
          return;
        }
        
        // Redirige vers SignIn.jsx si une inscription réussie
        navigate("/sign-in");
      }
    }
````

4. Amélioration : 

> email valide

````
 const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };
````

-> dans handleSubmit:

 Si l'adresse email est dans un format valide.

````
  if (!validateEmail(formData.email)) {
      setError("Veuillez entrer une adresse email valide.");
      return;
    }

````

> les champs obligatoires

````
    if (!formData.username || !formData.email || !formData.password || !passwordConfirm) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
````


#### fonction delete dans Profile.jsx

> La difficulté rencontrée pendant la passation de fetch à RTK Query fut l'ajustement des configurations nécessaires pour s'assurer que le **token JWT est correctement inclus dans les en-têtes des requêtes** et la **gestion des erreurs associées**.

> Token dans state redux ?

````
  const { currentUser, loading } = useSelector((state) => state.user);
  //console.log("Token JWT:", currentUser?.accessToken);
  //réponse : Token JWT: undefined
````

1. apiSlice.js

Configurer fetchBaseQuery avec le token JWT pour inclure le token dans l'en-tête Authorization.

La fonction baseQueryWithAuth récupère le token JWT à partir du state de Redux et l'ajoute dans les en-têtes des requêtes. Cela permet d'assurer que toutes les requêtes nécessitant une authentification sont correctement autorisées.

````
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

````


2. Profile.jsx 

````
// Importation de useSignInMutation:
import {
  useSignOutMutation,
  useDeleteUserMutation,
} from "../redux/usersApiSlice";
````

````
  // Déclaration RTK Query du hook useSignInMutation pour sign-in
  const [signOut, { isLoading, isError, isSuccess }] = useSignOutMutation();
  const [deleteUser] = useDeleteUserMutation();
````  

````
 // Supprimer un compte User
  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());

      // Savoir où cela commence dans la console
      //console.log("Début de la suppression de l'utilisateur");

      // Vérifier les datas envoyées à la mutation RTK Query
      //console.log("ID de l'utilisateur :", currentUser._id);
      //console.log("Token JWT :", currentUser.accessToken);

      // La mutation pour signUp via RTK Query et ".unwrap();"
      const res = await deleteUser({
        id: currentUser._id,
        // token JWT du user dans header sinon erreur 401 Unauthorized
        headers: {
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      }).unwrap();

      // Voir la réponse de l'API
      //console.log("Réponse de l'API après la suppression :", res);

      // Vérification de la réponse
      if (res.success === false) {
       // console.log("Échec de la suppression de l'utilisateur :", res);
        dispatch(deleteUserFailure(res));
        return;
      }

      // Si tout est ok, succès de la suppression
      //console.log("Suppression de l'utilisateur réussie :", res);
      dispatch(deleteUserSuccess(res));
      navigate("/");
    } catch (error) {
     // console.error("Erreur lors de la suppression de l'utilisateur :", error);
      dispatch(deleteUserFailure(error));
    }
  };
````

3. vérification des suppression de compte dans MongoDB

### fonction update dans Profile.jsx

1. 

````
// Importation de useSignInMutation:
import {
  useSignOutMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "../redux/usersApiSlice";
````

2. 

````
  // Déclaration RTK Query du hook useSignInMutation pour sign-in
  const [signOut, { isLoading, isError, isSuccess }] = useSignOutMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
````

3. handleSubmit

````
// Fonction de soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

  //.....

    try {
      dispatch(updateUserStart());
  
         // La mutation pour updateUser via RTK Query et ".unwrap();"
         const res = await updateUser({
          id: currentUser._id,
          // Mettre à jour les données à mettre à jour
          data: updatedData, 
        }).unwrap();

  
      if (res.success === false) {
        dispatch(updateUserFailure(res));
        return;
      }
      dispatch(updateUserSuccess(res));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

````

4. test et vérification dans mongoDB


### fonction handleGoogleClick

1. import

````
// Importation de useSignInMutation:
import { useGoogleSignInMutation} from "../redux/usersApiSlice";
````

2.  // Déclaration RTK Query du hook useGoogleSignInMutation pour GoogleSignIn

````
  const [googleSignIn] = useGoogleSignInMutation();
````

3. handleGoogleClick

De :

````
       const res = await fetch('/api/auth/google', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: result.user.displayName,
            email: result.user.email,
            photo: result.user.photoURL,
          }),
        });
        // Réponse en JSON
        const data = await res.json();

        // Dispatch de l'action signInSuccess avec les données utilisateur
        dispatch(signInSuccess(data));
````
A : 

````
  const { name, email, photoURL } = result.user;
        const res = await googleSignIn({
          name,
          email,
          photo: photoURL,
        }).unwrap();

    // Dispatch de l'action signInSuccess avec les données utilisateur
        dispatch(signInSuccess(res));       
````

````
const handleGoogleClick = async () => {
    try {
        // Création d'une instance de fournisseur d'authentification Google
        const provider = new GoogleAuthProvider();
        // Récupération de l'instance d'authentification Firebase
        const auth = getAuth(app);

        // Affichage de la fenêtre pop-up pour l'authentification Google
        const result = await signInWithPopup(auth, provider);
       // Envoi des données utilisateur au serveur backend         
   

        // Envoi des user data au serveur avec RTK Query
        const { name, email, photoURL } = result.user;
        const res = await googleSignIn({
          name,
          email,
          photo: photoURL,
        }).unwrap();
    
        // Dispatch de l'action signInSuccess avec les données utilisateur
        dispatch(signInSuccess(res));
        // Navigation vers la page home
        navigate('/');
       
    } catch (error) {
        console.log('connexion avec google impossible', error);
    }
  };
  ````# cahier-reccettes
