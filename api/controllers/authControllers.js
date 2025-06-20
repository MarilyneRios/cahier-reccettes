//models
import User from "../models/userModel.js";
//utils
import { sendResetEmail } from "../utils/emailService.js";
import { sendLoginNotificationEmail } from "../utils/emailConnexion.js";
import { errorHandler } from "../utils/error.js";
//crypt
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

// test
export const display = (req, res) => {
  // console.log("display request received");
  res.json({
    message: "hello world on api/authRoutes and authControllers",
  });
};

// @desc    Créer un nouvel utilisateur
// @route   POST /api/auth/signup
// @access  Public
export const signup = async (req, res, next) => {
  const { username, email, password, questionSecret, reponseSecret } = req.body;
  //console.log("req.body reçu :", req.body);
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
      expiresIn: "2h",
    });

    // Suppression du mot de passe des données utilisateur retournées
    const { password: hashedPassword, ...userData } = validUser._doc;

    // Définir une expiration pour le cookie
    const expiryDate = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2h en ms

    //envoyer un mail pour signifier qu'il y a eu une connexion

    try {
      await sendLoginNotificationEmail(validUser.email, validUser._id);
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email :", error);
      // Ne bloque pas la connexion si l'email échoue
    }

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
// @desc    Connexion d'un utilisateur via Google (avec création de compte si nécessaire)
// @route   POST /api/auth/google
// @access  Public
export const google = async (req, res, next) => {
  try {
    const { name, email, photo } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email manquant." });
    }

    let user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      const { password: hashedPassword, ...userData } = user._doc;
      const expiryDate = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 heures

      return res
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
          name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: photo,
      });

      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "2h", // ou TOKEN_EXPIRATION si défini
      });

      const expiryDate = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2h

      const { password, ...userData } = newUser._doc;

      return res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
          sameSite: "Lax",
          secure: process.env.NODE_ENV === "production",
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
   // console.log("Cookie access_token cleared");

    // Vérification si le cookie est vraiment supprimé
    const cookiesAfterClear = req.cookies["access_token"];
    if (!cookiesAfterClear) {
      //console.log("Cookies successfully cleared");
    } else {
     // console.log("Cookies not cleared:", cookiesAfterClear);
    }

    // Réponse de succès
    res.status(200).json("Signout successful!");
  } catch (error) {
    // En cas d'erreur, log et réponse d'erreur
    console.error("Error during logout:", error);
    res.status(500).json("Logout failed");
  }
};

// @desc    Récupère la question secrète d'un utilisateur à partir de son email
// @route   GET /api/auth/resetPassword
// @access  Public
export const getUserByEmail = async (req, res) => {
  const { email } = req.query;
  //console.log("👉 Requête reçue pour la récupération de la question secrète.");
  //console.log("📧 Email fourni :", email);
  try {
    const user = await User.findOne({ email }).select("email questionSecret");

    if (!user) {
      console.warn("⚠️ Aucun utilisateur trouvé avec cet email :", email);
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.status(200).json({ questionSecret: user.questionSecret });
  } catch (error) {
    console.error(
      "❌ Erreur lors de la récupération de l'utilisateur :",
      error
    );
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// @desc    Vérifie la réponse secrète à une question
// @route   POST /api/auth/verifyReponseSecret
// @access  Public
export const verifyReponseSecret = async (req, res) => {
  //console.log("📦 Corps reçu :", req.body);

  //récupèr email et reponseSecret du body
  const { email,  reponseSecret } = req.body;
  //console.log("👉 Requête reçue pour vérifier la réponse secrète à une question.");
  //console.log("📧 Email + réponse fournie :", email, reponseSecret);

  try {
    //récupère email et reponseSecret de bdd
    const user = await User.findOne({ email }).select("email reponseSecret");
    // vérification user existe
    if (!user) {
      console.warn("❌ Utilisateur non trouvé pour email:", email);
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // vérification reponseSecret existe
    if (!user.reponseSecret) {
      console.warn(
        "❌ La réponse secrète n'est pas définie pour l'utilisateur:",
        email
      );
      return res
        .status(400)
        .json({
          message: "La réponse secrète n'est pas définie pour cet utilisateur",
        });
    }

    // décrypter user.reponseSecret afin depouvoir comparer avec reponseSecret du body
    const isMatch = await bcryptjs.compare(reponseSecret, user.reponseSecret);

    if (isMatch) {
     // console.log("✅ Réponse secrète correcte pour", email);
      return res.status(200).json({ success: true });
    } else {
      console.warn("❌ Réponse secrète incorrecte pour", email);
      return res.status(401).json({ message: "Réponse secrète incorrecte" });
    }
  } catch (error) {
    console.error("❌ Stack :", error.stack);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

//@desc envoie le mail avec lien pour resetPassword
// @route   POST /api/auth/sendResetEmail
// @access  Public

export const resetPasswordRequest = async (req, res) => {
  const { email } = req.body;
  //console.log("email de resetPasswordRequest " , email)

  // Logique pour récupérer l'utilisateur et envoyer l'email
  const user = await User.findOne({ email });
  //console.log("user de resetPasswordRequest", user)


  if (!user) {
    return res.status(404).json({ message: "Utilisateur non trouvé" });
  }

  try {
    await sendResetEmail(user.email, user._id);
    return res.status(200).json({ message: "Email envoyé avec succès" });
  } catch (err) {
    console.error("Erreur captée dans resetPasswordRequest :", err);
    return res
      .status(500)
      .json({ message: "Erreur lors de l'envoi de l'email" });
  }
};

//@desc mofidifer le password perdu (resetPassword)
// @route   POST /api/auth/resetPassword/USER_ID?token=XYZ
// @access  Public (avec token temporaire sécurisé)

export const resetPassword = async (req, res, next) => {
  const { email, password } = req.body;
  const { id } = req.params;
  const token = req.query.token;

  
  //console.log("🔧 resetPassword triggered");
  //console.log("📥 Params ID:", id);
  //console.log("📥 Query token:", token);
  //console.log("📥 Body:", req.body);

  // Vérifier la présence des champs obligatoires
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email et mot de passe sont requis." });
  }

  try {
    // Vérifie le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //  console.log("🔐 Token décodé :", decoded);
    
    if (decoded.id !== id) {
      return res
        .status(401)
        .json({ message: "Token invalide pour cet utilisateur." });
    }

    // Vérifier si l'utilisateur existe avec l'ID et l'email
    const user = await User.findOne({ _id: id, email });

    if (!user) {
      return next(errorHandler(404, "Utilisateur non trouvé."));
    }

    // Hasher le nouveau mot de passe
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Mettre à jour le mot de passe de l'utilisateur
    user.password = hashedPassword;
    await user.save();

    // Répondre sans renvoyer le mot de passe
    const { password: _, ...userWithoutPassword } = user._doc;

    return res.status(200).json({
      message: "Mot de passe mis à jour avec succès.",
      user: userWithoutPassword,
    });
  } catch (error) {
    return next(error);
  }
};