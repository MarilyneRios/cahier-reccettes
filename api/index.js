import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
// Iportantion des routes
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoute.js';
import recipesRoutes from './routes/recipeRoute.js';
import IngredientRoutes from './routes/ingredientRoute.js'
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

//attention si avant les routes pour affichage des routes get!!!!
// Gérer toutes les autres routes en renvoyant 'index.html'
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});


// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
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


/**
 * Les diverse Routes api
 * 
 * Auth : api/auth/
  router.get('/', display); => GET : api/auth - Vérifier la connexion
  router.post('/signup', signup); => POST : api/auth/signup - enregistrer un user 
  router.post('/signin', signin); => POST : api/auth/signin - Authentifier un user et obtenir un token
  router.get('/signout', signout); => GET : api/auth/signout - Déconnexion et nettoyer les cookies
  router.post('/google', google); => POST : api/auth/google - S' Authentifier avec google

 * Private :  api/user/
 
  router.get('/', display); => GET: api/user/` GET : api/user- Vérifier la connexion
  router.post('/update/:id', verifyToken, updateUser); => POST : api/user/update/${currentUser._id}` - obtenir le profil du user
  router.delete('/delete/:id', verifyToken, deleteUser); => DELETE: api/user/delete/${currentUser._id}` - Modifier le profile d'un user
 */