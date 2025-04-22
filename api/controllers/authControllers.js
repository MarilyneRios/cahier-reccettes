import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// test
export const display = (req, res) => {
  console.log("display request received");
  res.json({
    message: "hello world on api/authRoutes and authControllers",
  });
};

// @desc    Créer un nouvel utilisateur
// @route   POST /api/auth/signup
// @access  Public
export const signup = async (req, res, next) => {
  const { username, email, password, questionSecret, reponseSecret } = req.body;
  console.log("req.body reçu :", req.body);
  try {
    // Vérifier la présence des champs obligatoires
    if (!password || !questionSecret || !reponseSecret) {
      return res
        .status(400)
        .json({ message: "Mot de passe, question secrète et réponse requis." });
    }

    // Vérifier si la question est bien dans l'énum
    const allowedQuestions = [
      "Quel est le prénom de votre premier animal ?",
      "Quelle est votre ville de naissance ?",
      "Quel est le nom de votre plat préféré ?",
      "Quelle est votre couleur préférée ?",
      "Quel est le deuxième prénom de votre mère ?",
    ];

    if (!allowedQuestions.includes(questionSecret)) {
      return res.status(400).json({ message: "Question secrète invalide." });
    }

    // Hashage du mot de passe et de la réponse secrète
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const hashedReponseSecret = bcryptjs.hashSync(reponseSecret, 10);

    // Création du nouvel utilisateur
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      questionSecret,
      reponseSecret: hashedReponseSecret,
    });

    await newUser.save();
    res.status(201).json({ message: "Inscription réussie." });
  } catch (error) {
    // Gestion des erreurs de duplication d'email ou username
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        message: `${
          duplicateField === "email" ? "Email" : "Pseudo"
        } déjà utilisé.`,
      });
    }
    next(error);
  }
};

// @desc    Connexion d'un utilisateur existant (authentification classique)
// @route   POST /api/auth/signin
// @access  Public
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Vérification de l'existence de l'utilisateur
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "Utilisateur non trouvé."));
    }

    // Vérification du mot de passe
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Identifiants incorrects."));
    }

    // Génération du token avec expiration
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "4h",
    });

    // Suppression du mot de passe des données utilisateur retournées
    const { password: hashedPassword, ...userData } = validUser._doc;

    // Définir une expiration pour le cookie
    const expiryDate = new Date(Date.now() + 4 * 60 * 60 * 1000); // 4h en ms

    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json({ ...userData, token });
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
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "4h",
      });
      const { password: hashedPassword, ...userData } = user._doc;
      const expiryDate = new Date(Date.now() + 14400000); // 4 heures
      res
        .cookie("access_token", token, {
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
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "4h",
      });
      const { password: hashedPassword2, ...userData } = newUser._doc;
      const expiryDate = new Date(Date.now() + 14400000); // 4 heures
      res
        .cookie("access_token", token, {
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
  console.log("Signout request received");
  try {
    // Suppression du cookie access_token
    res.clearCookie("access_token");
    console.log("Cookie access_token cleared");

    // Vérification si le cookie est vraiment supprimé
    const cookiesAfterClear = req.cookies["access_token"];
    if (!cookiesAfterClear) {
      console.log("Cookies successfully cleared");
    } else {
      console.log("Cookies not cleared:", cookiesAfterClear);
    }

    // Réponse de succès
    res.status(200).json("Signout successful!");
  } catch (error) {
    // En cas d'erreur, log et réponse d'erreur
    console.error("Error during logout:", error);
    res.status(500).json("Logout failed");
  }
};

// @desc    Question secrète afin de réinitialiser le mot de passe
// @route   GET /api/auth/resetPassword
// @access  Public

export const resetPassword = async (req, res, next) => {};
