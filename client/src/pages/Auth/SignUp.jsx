// Imports React et hooks
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
// composants réutilisables
import FormContainer from "../../components/shared/FormContainer";
//icons
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BsExclamationTriangle } from "react-icons/bs";
// Importation de useSignInMutation:
import { useSignUpMutation } from "../../redux/users/usersApiSlice";
//styles css
import "./sign.styles.css";

///////////////////////////////////////////////////////////////////
// SignUp
///////////////////////////////////////////////////////////////////
export default function SignUp() {
  // état pour stocker les données du formulaire
  const [formData, setFormData] = useState({});

  //eyes icon
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visiblePassword2, setVisiblePassword2] = useState(false);

  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);
  const [visibleConfirmPassword2, setVisibleConfirmPassword2] = useState(false);

  // gestion erreurs et chargement
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // affichage des consignes
  const [showPasswordConsigne, setShowPasswordConsigne] = useState(false);
  const [showPassword2Consigne, setShowPassword2Consigne] = useState(false);

  // gestion de la confirmation du psw
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // hook de navigation
  const navigate = useNavigate();

    
  // Déclaration RTK Query du hook useSignInMutation pour sign-up
  const [signUp] = useSignUpMutation();

  // validation email conforme
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  // gestion des changements dans les inputs
  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "passwordConfirm") {
      setPasswordConfirm(value);
    } else {
      setFormData({ ...formData, [id]: value });
  }
  //console.log(formData)


  // afficher ou cacher les consignes selon les champs concernés
  if (id === "password") {
      setShowPasswordConsigne(value.length > 0);
    }
    if (id === "password2") {
      setShowPassword2Consigne(value.length > 0);
    }
  };

 
  //Gère la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Si tous les champs obligatoires sont remplis.
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !passwordConfirm
    ) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    // Si l'adresse email est dans un format valide.
    if (!validateEmail(formData.email)) {
      setError("Veuillez entrer une adresse email valide.");
      return;
    }

    // Si les mots de passe saisis sont identiques.
    if (formData.password !== passwordConfirm) {
      setError("Les mots de passe ne correspondent pas !");
      return;
    }

    try {
      // Active l'état de chargement
      setLoading(true);
      // Réinitialise le message d'erreur pour éliminer les messages précédents.
      setError("");

      // Vérifie si `signUp` est bien une fonction, puis tente de l'exécuter.
      if (typeof signUp === "function") {
        // La mutation pour signUp via RTK Query et ".unwrap();" => attend la réponse
        const res = await signUp(formData).unwrap();
        // Déasctive l'état de chargement
        setLoading(false);

        // Si échec de l'inscription
        if (res.success === false) {
          setError("Le Pseudo ou l'email est déjà utilisé!");
          return;
        }

        // Redirige vers SignIn.jsx si une inscription réussie
        navigate("/sign-in");
      }
    } catch (error) {
      // Gestion des erreurs en cas d'échec
      setLoading(false);
      setError("Une erreur s'est produite lors de l'inscription.");
    }
  };

  return (
    <div className="SignInAndUpForm ">
      <FormContainer className="">
        <h1 className="d-flex justify-content-center text-dark ">
          Inscription
        </h1>

        {/* Formulaire d'inscription */}
        <Form onSubmit={handleSubmit}>

          {/* Champ pseudo */}
          <Form.Label htmlFor="username" className="form-label ">
            Pseudo
          </Form.Label>
          <Form.Group className="my-2">
            <Form.Control
              type="text"
              id="username"
              placeholder="Pseudo"
              onChange={handleChange}
              autoComplete="username"
            ></Form.Control>
          </Form.Group>

           {/* Champ email */}
          <Form.Group className="my-2">
            <Form.Label htmlFor="email" className="form-label">
              Email
            </Form.Label>
            <Form.Control
              type="email"
              id="email"
              placeholder="Email"
              onChange={handleChange}
              autoComplete="email"
            ></Form.Control>
          </Form.Group>

          {/**Premier mot de passe */}
          <Form.Group className="my-2">
            <Form.Label htmlFor="password" className="form-label">
              Premier mot de passe
            </Form.Label>
            <div className="d-flex">
              <Form.Control
                type={visiblePassword ? "text" : "password"}
                id="password"
                placeholder="Mot de passe"
                onChange={handleChange}
                autoComplete="current-password"
                className="me-2 password-input"
              ></Form.Control>

              {visiblePassword ? (
                <FaEyeSlash
                  onClick={() => setVisiblePassword(false)}
                  className="m-3"
                  size={20}
                />
              ) : (
                <FaEye
                  onClick={() => setVisiblePassword(true)}
                  size={20}
                  className="m-3"
                />
              )}
            </div>
            {/* consigne mot de passe affichée si showPasswordConsigne */}
            {showPasswordConsigne && (
              <Form.Text className="passwordHelpBlock muted mx-3">
                Votre mot de passe doit contenir entre 10-20 caractères, dont des
                lettres, nombres et caractères spéciaux.
                <span>
                  <BsExclamationTriangle size={20} className="mb-2 mx-3" /> Attention, il doit être sans espace vide{" "}
                  <BsExclamationTriangle size={20} className="mb-2 mx-3" />
                </span>
              </Form.Text>
            )}
          </Form.Group>

           {/**Confirmation Premier mot de passe */}   
          <Form.Group className="my-2">
            <Form.Label htmlFor="passwordConfirm" className="form-label">
              Confirmation du premier mot de passe
            </Form.Label>
            <div className="d-flex">
              <Form.Control
                type={visibleConfirmPassword ? "text" : "password"}
                id="passwordConfirm"
                placeholder="Confirmation du mot de passe"
                onChange={handleChange}
                autoComplete="new-password"
                value={passwordConfirm}
                className="me-2 password-input"
              ></Form.Control>
              {visibleConfirmPassword ? (
                <FaEyeSlash
                  onClick={() => setVisibleConfirmPassword(false)}
                  className="m-3"
                  size={20}
                />
              ) : (
                <FaEye
                  onClick={() => setVisibleConfirmPassword(true)}
                  size={20}
                  className="m-3"
                />
              )}
            </div>
          </Form.Group>

          {/**Deuxième mot de passe */}
          <Form.Group className="my-2">
            <Form.Label htmlFor="password2" className="form-label">
              Deuxième mot de passe
            </Form.Label>
            <div className="d-flex">
              <Form.Control
                type={visiblePassword ? "text" : "password"}
                id="password2"
                placeholder="deuxième mot de passe"
                onChange={handleChange}
                autoComplete="current-password2"
                className="me-2 password-input"
              ></Form.Control>
              {visiblePassword ? (
                <FaEyeSlash
                  onClick={() => setVisiblePassword(false)}
                  className="m-3"
                  size={20}
                />
              ) : (
                <FaEye
                  onClick={() => setVisiblePassword(true)}
                  size={20}
                  className="m-3"
                />
              )}
            </div>
            {/* consigne mot de passe 2 affichée si showPassword2Consigne */}
            {showPassword2Consigne && (
              <Form.Text className="passwordHelpBlock muted mx-3">
                Votre mot de passe doit contenir entre 6 et 8 caractères, dont des
                lettres, nombres et caractères spéciaux.
                <span>
                  <BsExclamationTriangle size={20} className="mb-2 mx-3" /> Attention, il doit être sans espace vide{" "}
                  <BsExclamationTriangle size={20} className="mb-2 mx-3" />
                </span>
              </Form.Text>
            )}
          </Form.Group>

          {/**Confirmation deuxieme mot de passe */}   
          <Form.Group className="my-2">
            <Form.Label htmlFor="passwordConfirm2" className="form-label">
              Confirmation du deuxième mot de passe
            </Form.Label>
            <div className="d-flex">
              <Form.Control
                type={visibleConfirmPassword ? "text" : "password"}
                id="passwordConfirm2"
                placeholder="Confirmation du 2e mot de passe"
                onChange={handleChange}
                autoComplete="new-password"
                value={passwordConfirm}
                className="me-2 password-input"
              ></Form.Control>
              {visibleConfirmPassword ? (
                <FaEyeSlash
                  onClick={() => setVisibleConfirmPassword(false)}
                  className="m-3"
                  size={20}
                />
              ) : (
                <FaEye
                  onClick={() => setVisibleConfirmPassword(true)}
                  size={20}
                  className="m-3"
                />
              )}
            </div>
          </Form.Group>

          {/* Question secrète */}
          <Form.Group controlId="ForgotPasswordQuestion" className="mb-3">
            <Form.Label>
              Question secrète pour récupérer votre mot de passe :
            </Form.Label>
            <Form.Control
              as="select"
              required
              onChange={handleChange}
              id="forgotQuestion"
            >
              <option value="">Sélectionnez une question...</option>
              <option value="Quel est le prénom de votre premier animal ?">
                Quel est le prénom de votre premier animal ?
              </option>
              <option value="Quelle est votre ville de naissance ?">
                Quelle est votre ville de naissance ?
              </option>
              <option value="Quel est le nom de votre film préféré ?">
                Quel est le nom de votre plat préféré ?
              </option>
              <option value="Quelle est votre couleur préférée ?">
                Quelle est votre couleur préférée ?
              </option>
              <option value="Quel est le prénom de votre meilleur ami d'enfance ?">
                Quel est le deuxième prénom de votre mère ?
              </option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="ForgotPasswordAnswer" className="mb-3">
            <Form.Label>Votre réponse :</Form.Label>
            <Form.Control
              type="text"
              placeholder="Votre réponse secrète"
              onChange={handleChange}
              id="forgotAnswer"
              required
              className="small-input"
            />
          </Form.Group>

          {/**btn */}
          <Button
            type="submit"
            variant="outline-success"
            className="my-3 w-100"
            disabled={loading}
          >
            {loading ? "Loading..." : " S'enregistrer"}
          </Button>
        </Form>

        <Row className="py-3">
          <Col className="text-center">
            Avez-vous déjà un compte ?{" "}
            <Link to="/sign-in" className="text-success">
              Se connecter
            </Link>
            <p className="text-danger mt-5">
              {error &&
                (typeof error === "string"
                  ? error
                  : "Le Pseudo ou l'email est déjà utilisé!")}
            </p>
          </Col>
        </Row>
      </FormContainer>
    </div>
  );
}
