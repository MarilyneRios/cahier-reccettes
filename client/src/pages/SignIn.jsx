import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signInStart, signInSuccess, signInFailure } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [visiblePassword, setVisiblePassword] = useState(false);

  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      dispatch(signInFailure("Veuillez remplir tous les champs."));
      return;
    }
  
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
  
      if (data.success === false) {
        const errorMessage = translateErrorMessage(data.message); // Utiliser une fonction de traduction
        dispatch(signInFailure(errorMessage));
        return;
      }
  
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure("Le mot de passe ou l'email est incorrect, veuillez réessayer.")); // Message générique
    }
  };
  
  const translateErrorMessage = (message) => {
    const errorTranslations = {
      "Invalid email or password": "Email ou mot de passe invalide",
      "User not found": "Utilisateur non trouvé",
      "wrong credentials":"Le mot de passe ou l'email est incorrect",
    };
    return errorTranslations[message] || "Une erreur est survenue, veuillez réessayer.";
  };
  

  return (
    <FormContainer>
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
          variant="outline-dark"
          className="my-3 w-100"
          disabled={loading}
        >
          {loading ? "Chargement..." : "Se connecter"}
        </Button>

        <OAuth disabled={loading} label={"Continue avec Google"}/>
      </Form>

      <Row className="py-3">
        <Col>
          Avez-vous un compte ?{" "}
          <Link to="/sign-up" className="text-dark">
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
  );
}
