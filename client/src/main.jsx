import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
//Redux
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
//style
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// importation composants
import App from './App';
import PrivateRoute from './components/authentificate/PrivateRoute';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import Profile from './pages/Profile/Profile';
import ViewRecipes from './pages/Recipes/ViewRecipes/ViewRecipes';
import AddRecipe from './pages/Recipes/AddRecipe/AddRecipe';
import DisplayRecipe from './pages/Recipes/DisplayRecipe/DisplayRecipe';
import ChangeRecipe from './pages/Recipes/ChangeRecipe/ChangeRecipe'
import AllFavoriteRecipe from './pages/Recipes/FavoriteRecipe/AllFavoriteRecipe';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Home />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/about' element={<About />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<Profile />} />
        <Route path='/viewRecipes' element={<ViewRecipes />} />
        <Route path='/addRecipe' element={<AddRecipe />} />
        <Route path='/displayRecipe/:id' element={<DisplayRecipe/>} />
        <Route path='/changeRecipe/:id' element={<ChangeRecipe />} />
        <Route path='/allFavoriteRecipe' element={<AllFavoriteRecipe />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </PersistGate>
  </Provider>
);


