import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
// Iportantion des routes
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoute.js';
import recipesRoutes from './routes/recipeRoute.js';
import IngredientRoutes from './routes/ingredientRoute.js';
import favoriteRecipes from './routes/favoriteRecipeRoute.js';
//
import cookieParser from 'cookie-parser';
import path from 'path';

// Charger les variables d'environnement à partir du fichier .env
dotenv.config();

// Connexion à la base de données
connectDB();


// Initialiser express et définir le port
const app = express();
const port = process.env.PORT || 3000;

// Obtenir le chemin absolu du répertoire courant
const __dirname = path.resolve();

// Servir les fichiers statiques du dossier 'client/dist'
app.use(express.static(path.join(__dirname, '/client/dist')));
//app.use(express.static(path.join(__dirname, 'client', 'dist')));


// Middleware pour parser (convertir) le JSON
app.use(express.json()); 
// Middleware pour parser (convertir) cookies
app.use(cookieParser());

//Routes de l'API pour les utilisateurs
app.use('/api/user', userRoutes);  
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipesRoutes); 
app.use('/api/ingredients', IngredientRoutes); 
app.use('/api/favoriteRecipes', favoriteRecipes); 

//attention si avant les routes pour affichage des routes get!!!!
// Gérer toutes les autres routes en renvoyant 'index.html'
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});


// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    console.error(err.stack); // Log de l'erreur pour le débogage // 11/09/24
    return res.status(statusCode).json({
      success: false,
      message,
      statusCode,
    });
  });

// serveur sur le port process.env.PORT
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});


