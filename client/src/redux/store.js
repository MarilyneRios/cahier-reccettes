import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// importation les reducers
import userReducer from "./users/userSlice.js"; 
import recipeReducer from "./recipes/recipeSlice.js";
import favoriteReducer from "./favorites/favoriteSlice.js";
// import api
import { apiSlice } from './apiSlice.js';
import {recipesApiSlice} from './recipes/recipesApiSlice.js';
import { favoriteApiSlice } from './favorites/favoriteApiSlice.js';
//import {usersApiSlice} from './users/usersApiSlice.js';


const rootReducer = combineReducers({
  user: userReducer,
  recipe: recipeReducer,
  favorite: favoriteReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  [recipesApiSlice.reducerPath]: recipesApiSlice.reducer,
  [favoriteApiSlice.reducerPath]: favoriteApiSlice.reducer,   
  // Ajoutez les autres reducers ici
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['user'], // Seuls les reducers spécifiés seront persistés
  blacklist: ['recipe','favorite'], // Ne pas persister les données de recette
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false, }).concat(apiSlice.middleware), 
    devTools:true
});

export const persistor = persistStore(store);