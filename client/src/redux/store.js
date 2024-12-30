import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// importation les reducers
import userReducer from "./users/userSlice.js"; 
import recipeReducer from "./recipes/recipeSlice.js"
// import api
import { apiSlice } from './apiSlice.js';
import {recipesApiSlice} from './recipes/recipesApiSlice.js';
//import {usersApiSlice} from './users/usersApiSlice.js';


const rootReducer = combineReducers({
  user: userReducer,
  recipe: recipeReducer,
  
  [apiSlice.reducerPath]: apiSlice.reducer,
  [recipesApiSlice.reducerPath]:recipesApiSlice.reducer,
      
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