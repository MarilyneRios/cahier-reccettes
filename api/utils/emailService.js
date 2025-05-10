import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

// 🔐 Fonction pour générer un token JWT temporaire de 15 minutes
export const generateResetToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "15m" });
};

// 📩 Fonction pour envoyer l'email avec lien sécurisé de réinitialisation
export const sendResetEmail = async (userEmail, userId) => {
  console.log("📩 Début de sendResetEmail");

  const transporter = nodemailer.createTransport({
    pool: true,
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false, // Accepte les certificats auto-signés si nécessaire
    },
   // logger: true,
   // debug: true,
  });

  // Génération du token de réinitialisation
  const token = generateResetToken(userId);

  // Lien de réinitialisation avec le token inclus
  const resetLink = `https://mon-cahier-de-reccettes.onrender.com/resetPassword/${userId}?token=${token}`;
 //const resetLink = `http://localhost:5173/resetPassword/${userId}?token=${token}`;
 //console.log("lien pour tester dans insomnia :", resetLink )


  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject:
        "Réinitialisation de votre mot de passe pour Mon cahier de recettes",
      text: `Vous avez demandé à réinitialiser votre mot de passe. Voici le lien : ${resetLink}`,
      html: `
        <p>Bonjour,</p>
        <p>Vous avez demandé à réinitialiser votre mot de passe.</p>
        <p>
          Cliquez sur le lien ci-dessous pour définir un nouveau mot de passe. Ce lien est valable 15 minutes :
        </p>
        <p>
          <a href="${resetLink}">Réinitialiser mon mot de passe</a>
        </p>
        <p>
          Si vous n'avez pas demandé cette réinitialisation, ignorez simplement cet e-mail.
        </p>
        <hr />
        <p style="font-size: 12px; color: #888;">© Mon cahier de recettes</p>
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
