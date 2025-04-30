import nodemailer from "nodemailer";

export const sendResetEmail = async (userEmail, userId) => {
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
      subject: 'Réinitialisation de votre mot de passe pour Mon cahier de recettes',
      text: `Vous avez demandé à réinitialiser votre mot de passe.`,
      html: `
        <p>Vous avez demandé à réinitialiser votre mot de passe.</p>
        <p>Voici le lien pour réinitialiser : <a href="https://tonsite.com/reset-password/${userId}">Réinitialiser</a></p>
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
