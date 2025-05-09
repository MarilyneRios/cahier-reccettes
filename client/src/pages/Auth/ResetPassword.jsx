import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
//Composant réutilisable
import FormContainer from "../../components/shared/FormContainer";

// icones
import { FaEye, FaEyeSlash } from "react-icons/fa";

//redux userSlice
import {
  resetUserStart,
  resetUserSuccess,
  resetUserFailure,
} from "../../redux/users/userSlice";

import { useResetPasswordMutation } from "../../redux/users/usersApiSlice";
import "../Profile/Profile.css";

///////////////////////////////////////////////////////////////////
//ResetPassword
//////////////////////////////////////////////////////////////////

export default function ResetPassword() {
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  console.log("📩 Début de resetPassword")
  // Initialisation de l'état pour les données du formulaire
  const [formData, setFormData] = useState({
      email: "",
      password: "",
      passwordConfirm: "",
  });

  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);
  const [localError, setLocalError] = useState("");
  const [success, setSuccess] = useState(false);

  // hook de navigation
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  console.log("user info", loading);

  // Déclaration RTK Query du hook useResetPasswordMutation pour updateUser
  const [resetPassword] = useResetPasswordMutation();

  ////////////////////////////////////////////
  // Fonction de gestion du changement de valeur des champs du formulaire
  ////////////////////////////////////////////
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setLocalError("");
  };
  console.log(formData);

  ////////////////////////////////////////////
  // Fonction de soumission du formulaire
  ////////////////////////////////////////////
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.passwordConfirm) {
      setLocalError("Les mots de passe ne correspondent pas !");
      return;
    }

    if (!formData.password) {
      setLocalError("Le mot de passe est requis.");
      return;
    }

    try {
      dispatch(resetUserStart());

      const res = await resetPassword({
        id,
        token,
        data: {
          email: formData.email,
          password: formData.password,
        },
      }).unwrap();

      dispatch(resetUserSuccess(res));
      navigate("/sign-in");
    } catch (error) {
      dispatch(resetUserFailure(error));
      setLocalError("Erreur lors de la réinitialisation du mot de passe.");
    }
  };

  const { email, password, passwordConfirm } = formData;

  return (
    <div className="SignInAndUpForm m-4">
      <div className=""></div>
      <FormContainer>
        <h1 className="d-flex justify-content-center text-dark">
          Réinitialiser votre mot de passe
        </h1>

        <Form onSubmit={handleSubmit}>
          {/* afficher l'email du user ???*/}
          <Form.Group className="my-2">
            <h6 className="fst-italic">Email :</h6>
            <Form.Control
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              autoComplete="email"
              onChange={handleChange}
            />
          </Form.Group>
          {/* Entrer votre nouveau mot de passe */}
          <Form.Group className="my-2">
            <h6 className="fst-italic">Entrer votre nouveau mot de passe :</h6>
            <div className="d-flex">
              <Form.Control
                type={visiblePassword ? "text" : "password"}
                id="password"
                placeholder="Mot de passe"
                value={password}
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

          <Form.Group className="my-2">
            <h6 className="fst-italic">Confirmer votre mot de passe :</h6>
            <div className="d-flex">
              <Form.Control
                type={visibleConfirmPassword ? "text" : "password"}
                id="passwordConfirm"
                placeholder="Confirmation du mot de passe"
                value={passwordConfirm}
                onChange={handleChange}
                autoComplete="new-password"
                className="me-2"
              />
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

          <Button
            type="submit"
            variant="outline-dark"
            className="my-3 w-100 btnProfil"
            disabled={loading}
          >
            {loading ? "Loading..." : "Enregistrer"}
          </Button>

          <div>
            {localError && <p className="text-danger mt-5">{localError}</p>}

            {success  && (
              <p className="text-success mt-5">
                Les modifications ont été mises à jour avec succès !
              </p>
            )}
          </div>
        </Form>
      </FormContainer>
    </div>
  );
}
