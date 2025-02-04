import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// test
export const display = (req, res) => {
  console.log('display request received');
  res.json({
    message: "hello world on api/authRoutes and authControllers",
  });
};

// @desc    Créer un nouvel utilisateur
// @route   POST /api/auth/signup
// @access  Public
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  // Vérifier la présence du mot de passe dans la requête
  if (!password) {
    return res.status(400).json({ message: "Le mot de passe est requis" });
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json({ message: "Inscription réussie" });
  } catch (error) {
    next(error);
  }
};

// @desc    Connexion d'un utilisateur existant (authentification classique)
// @route   POST /api/auth/signin
// @access  Public
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    //vérif si email est correct
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));
    //vérif le psw  avec compareSync
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "wrong credentials"));
    
    // Générer un token avec expiration 
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET,  { expiresIn: "4h" } ); // Changer pour "4h" en production

    // Supprimer le mot de passe des données retournées
    const { password: hashedPassword, ...userData  } = validUser._doc;

    // Définir une expiration pour le cookie
    const expiryDate = new Date(Date.now() + 14400000); // 4 heures => 14400000 ou 60000 pour un min afin de tester la déconnexion
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate }) //
      .status(200)
      .json({ ...userData, token } );  // Ajoute le token dans un objet
  } catch (error) {
    next(error);
  }
};

// @desc    Connexion d'un utilisateur via Google (avec création de compte si nécessaire)
// @route   POST /api/auth/google
// @access  Public
export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1m" });
      const { password: hashedPassword, ...userData  } = user._doc;
      const expiryDate = new Date(Date.now() + 14400000); // 4 heures  
      res
        .cookie('access_token', token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json({ ...userData, token });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1m" });
      const { password: hashedPassword2, ...userData  } = newUser._doc;
      const expiryDate = new Date(Date.now() + 14400000); // 4 heures  
      res
        .cookie('access_token', token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json({ ...userData, token });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Déconnexion d'un utilisateur
// @route   GET /api/auth/signout
// @access  Public
export const signout = (req, res) => {
  console.log('Signout request received');
  try {
    res.clearCookie('access_token');
    
    // Log to verify that the cookies have been cleared
    const cookiesAfterClear = req.cookies['access_token'];
    if (!cookiesAfterClear) {
      console.log('Cookies successfully cleared');
    } else {
      console.log('Cookies not cleared:', cookiesAfterClear);
    }

    res.status(200).json('Signout successful!');
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json('Logout failed');
  }
}
