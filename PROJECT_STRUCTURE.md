CAHIER-RECETTE/
├── api/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authControllers.js
│   │   ├── favoriteRecipeController.js
│   │   ├── recipeController.js
│   │   └── userController.js
│   ├── models/
│   │   ├── recipeModel.js
│   │   └── userModel.js
│   ├── routes/
│   │   ├── authRoute.js
│   │   ├── favoriteRecipeRoute.js
│   │   ├── recipeRoute.js
│   │   └── userRoutes.js
│   ├── utils/
│   │   ├── error.js
│   │   └── verifyUser.js
│   │   └── emailConnexion.js
│   │   └── emailService.js
│   │   └── tokenService.js
│   └── index.js
│   └── readme.md
│
├── client/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       │   ├── authentificate/
│       │   │   ├── OAuth.jsx
│       │   │   └── PrivateRoute.jsx
│       │   ├── heros/
│       │   │   ├── Hero.jsx
│       │   │   ├── hero.styles.css
│       │   │   └── HeroConnect.jsx
│       │   ├── layout/
│       │   │   ├── Footer.jsx
│       │   │   ├── Header.css
│       │   │   └── Header.jsx
│       │   ├── recipes/
│       │   │   ├── CardRecipe.css
│       │   │   └── CardRecipe.jsx
│       │   ├── shared/
│       │   │   ├── editor/
│       │   │   │   ├── CKEditor.jsx
│       │   │   │   └── CKEditor.styles.css
│       │   │   ├── flag/
│       │   │   │   └── CountryFlag.jsx
│       │   │   └── like/
│       │   │       ├── FavoriteButton.jsx
│       │   │       └── favoriteButton.styles.css
│       │   ├── search/
│       │   │   ├── FavoriteFilterComponent.jsx
│       │   │   ├── filter.styles.css
│       │   │   ├── FilterComponent.jsx
│       │   │   ├── SearchBar.css
│       │   │   ├── searchBar.jsx
│       │   │   ├── SearchBarFavorite.jsx
│       │   │   └── BackButton.jsx
│       │   ├── FormContainer.jsx
│       │   ├── FormContainer.css
│       │   └── Loader.jsx
│
│       ├── pages/
│       │   ├── About/
│       │   │   ├── About.css
│       │   │   └── About.jsx
│       │   ├── Auth/
│       │   │   ├── SignIn.jsx
│       │   │   └── SignUp.jsx
│       │   ├── Home/
│       │   │   ├── Home.css
│       │   │   └── Home.jsx
│       │   ├── Profile/
│       │   │   ├── Profile.css
│       │   │   └── Profile.jsx
│       │   └── Recipes/
│       │       ├── AddRecipe/
│       │       │   ├── AddRecipe.jsx
│       │       │   └── addRecipe.styles.css
│       │       ├── ChangeRecipe/
│       │       │   ├── ChangeRecipe.jsx
│       │       │   └── changeRecipe.styles.css
│       │       ├── DisplayRecipe/
│       │       │   ├── DisplayRecipe.jsx
│       │       │   └── displayRecipe.styles.css
│       │       ├── FavoriteRecipe/
│       │       │   ├── AllFavoriteRecipe.jsx
│       │       │   └── allFavoriteRecipe.styles.css
│       │       └── ViewRecipes/
│       │           ├── ViewRecipes.jsx
│       │           └── ViewRecipes.css
│
│       ├── redux/
│       │   ├── favorites/
│       │   │   ├── favoriteApiSlice.js
│       │   │   └── favoriteSlice.js
│       │   ├── recipes/
│       │   │   ├── recipesApiSlice.js
│       │   │   └── recipesSlice.js
│       │   ├── users/
│       │   │   ├── usersApiSlice.js
│       │   │   └── usersSlice.js
│       │   ├── apiSlice.js
│       │   ├── globalSlice.js
│       │   └── store.js
│
│       ├── App.jsx
│       ├── App.css
│       ├── firebase.js
│       ├── index.css
│       └── main.jsx
│
├── .env
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
