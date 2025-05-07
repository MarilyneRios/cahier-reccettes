//emailConnexion.js
import nodemailer from "nodemailer";

export const sendLoginNotificationEmail = async (userEmail, userId) => {
  console.log("📩 Début de sendResetEmail");

  const transporter = nodemailer.createTransport({
    pool: true,
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
     rejectUnauthorized: false, // Accepte les certificats auto-signés si nécessaire
    },
    logger: true, 
    debug: true,
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: 'Nouvelle connexion sur Mon cahier de recettes',
      text: `Bonjour,
    
    Une connexion à votre compte Mon cahier de recettes a été détectée.
    
    Si vous êtes à l'origine de cette connexion, aucune action n'est requise.
    
    Si ce n'est pas vous, veuillez vous connecter immédiatement et modifier votre mot de passe :
    https://mon-cahier-de-reccettes.onrender.com/sign-in
    
    Cordialement,
    L'équipe de Mon cahier de recettes
    `,
      html: `
        <p>Bonjour,</p>
        <p>Une connexion à votre compte <strong>Mon cahier de recettes</strong> a été détectée.</p>
        <p>Si vous êtes à l'origine de cette connexion, aucune action n'est requise.</p>
        <p>Si ce n'était pas vous, veuillez modifier votre mot de passe au plus vite :</p>
        <p><a href="https://mon-cahier-de-reccettes.onrender.com/sign-in">Se connecter et sécuriser mon compte</a></p>
        <p>Cordialement,<br>L'équipe de Mon cahier de recettes</p>
      `,
    });

    console.log("📧 Email de réinitialisation envoyé à :", userEmail);
    return true;
  } catch (err) {
    console.error("❌ Erreur dans sendResetEmail :", err);
    console.error("❌ Erreur dans sendResetEmail :", err);
    return false;
  }
};
