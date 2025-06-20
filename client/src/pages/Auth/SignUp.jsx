// Imports React et hooks
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
// Composant réutilisable
import FormContainer from "../../components/shared/FormContainer";
// Icônes
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BsExclamationTriangle } from "react-icons/bs";
// Hook RTK Query pour l'inscription
import { useSignUpMutation } from "../../redux/users/usersApiSlice";
// CSS
import "./sign.styles.css";

///////////////////////////////////////////////////////////////////
// SignUp
///////////////////////////////////////////////////////////////////
export default function SignUp() {
  // États pour gérer les données du formulaire
  const [formData, setFormData] = useState({});
  // Gestion de l'affichage des mots de passe
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);
  // Gestion des erreurs et du chargement
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  // Affichage des consignes du mot de passe
  const [showPasswordConsigne, setShowPasswordConsigne] = useState(false);
  // Gestion de la confirmation de mot de passe
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // Hook de navigation
  const navigate = useNavigate();
  // Hook RTK Query pour l'inscription
  const [signUp] = useSignUpMutation();

  // Validation du format d'email
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  // Gestion des changements dans les inputs
  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "passwordConfirm") {
      setPasswordConfirm(value);
    } else {
      setFormData({ ...formData, [id]: value });
    }

    // Affichage de la consigne pour le mot de passe
    if (id === "password") {
      setShowPasswordConsigne(value.length > 0);
    }
  };
//  console.log("formData de sin-up",formData);
  // Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Log pour debug des données avant soumission
   // console.log("formData complet :", formData);
   // console.log("passwordConfirm :", passwordConfirm);
  
    // Vérification des champs obligatoires
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !passwordConfirm ||
      !formData.questionSecret ||
      !formData.reponseSecret
    ) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
  
    // Vérification du format de l'email
    if (!validateEmail(formData.email)) {
      setError("Veuillez entrer une adresse email valide.");
      return;
    }
  
    // Vérification de la correspondance des mots de passe
    if (formData.password !== passwordConfirm) {
      setError("Les mots de passe ne correspondent pas !");
      return;
    }
  
    try {
      setLoading(true);
      setError("");
  
      // Exécution de la mutation d'inscription
      const res = await signUp(formData).unwrap();
  
    //  console.log("Réponse du back :", res);
  
      setLoading(false);
  
      // Vérifie le message de succès retourné par le back
      if (res.message !== "Inscription réussie.") {
        setError("Le Pseudo ou l'email est déjà utilisé !");
        return;
      }
  
      // Redirection vers la page de connexion en cas de succès
      navigate("/sign-in");
  
    } catch (error) {
      setLoading(false);
    //  console.error("Erreur lors de l'inscription :", error);
      setError(
        error?.data?.message ||
          "Une erreur s'est produite lors de l'inscription."
      );
    }
  };
  

  return (
    <div className="SignInAndUpForm">
      <FormContainer>
        <h1 className="d-flex justify-content-center text-dark">Inscription</h1>

        {/* Formulaire d'inscription */}
        <Form onSubmit={handleSubmit}>
  {/* Pseudo */}
  <Form.Group className="my-2">
    <Form.Label htmlFor="username">Pseudo</Form.Label>
    <Form.Control
      type="text"
      id="username" // <-- correspond au back
      placeholder="Pseudo"
      onChange={handleChange}
      autoComplete="username"
    />
  </Form.Group>

  {/* Email */}
  <Form.Group className="my-2">
    <Form.Label htmlFor="email">Email</Form.Label>
    <Form.Control
      type="email"
      id="email" // <-- correspond au back
      placeholder="Email"
      onChange={handleChange}
      autoComplete="email"
    />
  </Form.Group>

  {/* Mot de passe */}
  <Form.Group className="my-2">
    <Form.Label htmlFor="password">Mot de passe</Form.Label>
    <div className="d-flex">
      <Form.Control
        type={visiblePassword ? "text" : "password"}
        id="password" // <-- correspond au back
        placeholder="Mot de passe"
        onChange={handleChange}
        autoComplete="new-password"
        className="me-2 password-input"
      />
      {visiblePassword ? (
        <FaEyeSlash onClick={() => setVisiblePassword(false)} size={20} className="m-3" />
      ) : (
        <FaEye onClick={() => setVisiblePassword(true)} size={20} className="m-3" />
      )}
    </div>
    {showPasswordConsigne && (
      <Form.Text className="passwordHelpBlock muted mx-3">
        Votre mot de passe doit contenir entre 10-20 caractères, dont des lettres, nombres et caractères spéciaux.
        <span>
          <BsExclamationTriangle size={20} className="mb-2 mx-3" />
          Attention, il doit être sans espace vide.
          <BsExclamationTriangle size={20} className="mb-2 mx-3" />
        </span>
      </Form.Text>
    )}
  </Form.Group>

  {/* Confirmation du mot de passe (pas dans formData, géré à part) */}
  <Form.Group className="my-2">
    <Form.Label htmlFor="passwordConfirm">Confirmation du mot de passe</Form.Label>
    <div className="d-flex">
      <Form.Control
        type={visibleConfirmPassword ? "text" : "password"}
        id="passwordConfirm"
        placeholder="Confirmer le mot de passe"
        onChange={handleChange}
        value={passwordConfirm}
        autoComplete="new-password"
        className="me-2 password-input"
      />
      {visibleConfirmPassword ? (
        <FaEyeSlash onClick={() => setVisibleConfirmPassword(false)} size={20} className="m-3" />
      ) : (
        <FaEye onClick={() => setVisibleConfirmPassword(true)} size={20} className="m-3" />
      )}
    </div>
  </Form.Group>

  {/* Question secrète */}
  <Form.Group className="mb-3">
    <Form.Label htmlFor="questionSecret">Question secrète</Form.Label>
    <Form.Control as="select" id="questionSecret" onChange={handleChange} required>
      <option value="">Sélectionnez une question...</option>
      <option value="Quel est le prénom de votre premier animal ?">Quel est le prénom de votre premier animal ?</option>
      <option value="Quelle est votre ville de naissance ?">Quelle est votre ville de naissance ?</option>
      <option value="Quel est le nom de votre plat préféré ?">Quel est le nom de votre plat préféré ?</option>
      <option value="Quelle est votre couleur préférée ?">Quelle est votre couleur préférée ?</option>
      <option value="Quel est le deuxième prénom de votre mère ?">Quel est le deuxième prénom de votre mère ?</option>
   
    </Form.Control>
  </Form.Group>

  {/* Réponse secrète */}
  <Form.Group className="mb-3">
    <Form.Label htmlFor="reponseSecret">Votre réponse</Form.Label>
    <Form.Control
      type="text"
      id="reponseSecret" // <-- correspond au back
      placeholder="Votre réponse secrète"
      onChange={handleChange}
      required
    />
  </Form.Group>

  {/* Bouton de validation */}
  <Button type="submit" variant="outline-success" className="my-3 w-100" disabled={loading}>
    {loading ? "Loading..." : "S'enregistrer"}
  </Button>
</Form>


        {/* Redirection vers la page de connexion */}
        <Row className="py-3">
          <Col className="text-center">
            Déjà inscrit ?{" "}
            <Link to="/sign-in" className="text-success text-decoration-none">Se connecter</Link>
            {/* Affichage des erreurs */}
            {error && <p className="text-danger mt-5">{error}</p>}
          </Col>
        </Row>
      </FormContainer>
    </div>
  );
}
