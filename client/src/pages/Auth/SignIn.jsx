import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../../components/shared/FormContainer";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signInStart, signInSuccess, signInFailure } from "../../redux/users/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../../components/authentificate/OAuth";
// Importation de useSignInMutation:
import { useSignInMutation} from "../../redux/users/usersApiSlice";
//style css
import './sign.styles.css'



///////////////////////////////////////////////////////////////////
// SignIn
///////////////////////////////////////////////////////////////////
export default function SignIn() {
  // les états
  const [formData, setFormData] = useState({});
  const [visiblePassword, setVisiblePassword] = useState(false);

  // Accès à l'état de chargement et d'erreur depuis Redux
  const { loading, error } = useSelector((state) => state.user);

  // hook de navigation
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Déclaration RTK Query du hook useSignInMutation pour sign-in
  const [signIn] = useSignInMutation();
  
  // Gérer les modifications d'entrée et mettre à jour l'état des données du formulaire
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    //s'assurer que les champs soient remplis
    if (!formData.email || !formData.password) {
      dispatch(signInFailure("Veuillez remplir tous les champs."));
      return;
    }

    try {
      dispatch(signInStart());
      // Vérifie si signIn est une fonction avant de l'appeler
      if (typeof signIn === 'function') {
        // Effectue la mutation de connexion à l'aide de la requête RTK
        console.log("Envoi des données de connexion:", formData);
        const res = await signIn(formData).unwrap();
        console.log("Réponse de la mutation:", res);

        // Recherche d'erreurs dans la réponse
        if (res.success === false) {
          const errorMessage = translateErrorMessage(res.message);
          console.log("Message d'erreur traduit:", errorMessage);
          dispatch(signInFailure(errorMessage));
          return;
        }

        // dispatch l'action de réussite avec les données de réponse
        dispatch(signInSuccess(res));

        // Navigate to Home.jsx si connexion réussie avec sign-in
        navigate("/");
      } else {
        console.log("signIn n'est pas une fonction:", signIn);
        dispatch(signInFailure("Erreur interne, veuillez réessayer."));
      }
    } catch (error) {
      console.log("Erreur lors de la connexion:", error);
      dispatch(signInFailure("Le mot de passe ou l'email est incorrect, veuillez réessayer.")); // Message générique
    }
  };
  
  // Fonction pour traduire les messages d'erreur
  const translateErrorMessage = (message) => {
    const errorTranslations = {
      "Invalid email or password": "Email ou mot de passe invalide",
      "User not found": "Utilisateur non trouvé",
      "wrong credentials":"Le mot de passe ou l'email est incorrect",
    };
    return errorTranslations[message] || "Une erreur est survenue, veuillez réessayer.";
  };
  

  return (
    <div className="SignInAndUpForm">
    <FormContainer >
      <h1 className="d-flex justify-content-center text-dark">Connexion</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="my-2 ">
          <Form.Control
            type="email"
            id="email"
            placeholder="Email"
            value={formData.email || ""}
            onChange={handleChange}
            autoComplete="email"
          />
        </Form.Group>

        <Form.Group className="my-2">
          <div className="d-flex">
            <Form.Control
              type={visiblePassword ? "text" : "password"}
              id="password"
              placeholder="Mot de passe"
              value={formData.password || ""}
              onChange={handleChange}
              autoComplete="current-password"
              className="me-2"
            />
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
        </Form.Group>

        <Button
          type="submit"
          variant="outline-success"
          className="my-3 w-100"
          disabled={loading}
        >
          {loading ? "Chargement..." : "Se connecter"}
        </Button>

      
        <div className="separator my-4">
           <hr className="separator-line" />
           <span className="separator-text">ou</span>
           <hr className="separator-line" />
        </div>
 
        <OAuth disabled={loading} label={"Continue avec Google"}/>
      </Form>

      <Row className="py-3">
        <Col>
          Avez-vous un compte ?{" "}
          <Link to="/sign-up" className="text-success">
            Inscription
          </Link>
          {error && (
            <p className="text-danger mt-5">
              {typeof error === "string"
                ? error
                : "Une erreur est survenue, veuillez réessayer."}
            </p>
          )}
        </Col>
      </Row>
    </FormContainer>
    </div>

  );
}
