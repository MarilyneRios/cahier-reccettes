import { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { FaEye, FaEyeSlash } from "react-icons/fa";
// Importation de useSignInMutation:
import { useSignUpMutation } from "../redux/usersApiSlice";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  //eyes icon
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);
  // gestion erreurs et chargement
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  // gestion de la confirmation du psw
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "passwordConfirm") {
      setPasswordConfirm(value);
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  // hook de navigation
  const navigate = useNavigate();
  //console.log(formData)

  // Déclaration RTK Query du hook useSignInMutation pour sign-up
  const [signUp] = useSignUpMutation();

  // email conforme
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Si tous les champs obligatoires sont remplis.
    if (!formData.username || !formData.email || !formData.password || !passwordConfirm) {
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
    <FormContainer>
      <h1 className="d-flex justify-content-center text-dark">
        Inscription
      </h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="my-2">
          <Form.Control
            type="text"
            id="username"
            placeholder="Pseudo"
            onChange={handleChange}
            autoComplete="username"
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2">
          <Form.Control
            type="email"
            id="email"
            placeholder="Email"
            onChange={handleChange}
            autoComplete="email"
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2">
          <div className="d-flex">
            <Form.Control
              type={visiblePassword ? "text" : "password"}
              id="password"
              placeholder="Mot de passe"
              onChange={handleChange}
              autoComplete="current-password"
              className="me-2"
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
        </Form.Group>

        <Form.Group className="my-2">
          <div className="d-flex">
            <Form.Control
              type={visibleConfirmPassword ? "text" : "password"}
              id="passwordConfirm"
              placeholder="Confirmation du mot de passe"
              onChange={handleChange}
              autoComplete="new-password"
              value={passwordConfirm}
              className="me-2"
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

        <Button type="submit" variant="outline-dark" className="my-3 w-100"  disabled={loading}>
         
          {loading ? "Loading..." : " S'enregistrer"}
        </Button>
      </Form>

      <Row className="py-3">
        <Col className="text-center">
          Avez-vous déjà un compte ?{" "}
          <Link to="/sign-in" className="text-dark">
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
  );
}