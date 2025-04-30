import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
//Composant réutilisable
import FormContainer from "../../components/shared/FormContainer";

// icones
import { FaEye, FaEyeSlash } from "react-icons/fa";

//redux userSlice
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../../redux/users/userSlice";
// Importation de useSignInMutation:
import { useUpdateUserMutation } from "../../redux/users/usersApiSlice";
import "../Profile/Profile.css";

///////////////////////////////////////////////////////////////////
//ResetPassword
//////////////////////////////////////////////////////////////////

export default function ResetPassword() {
  const { userId } = useParams();
  const { loading } = useSelector((state) => state.user);
  console.log("userId", userId)

  const [formData, setFormData] = useState({
    password: "",
    passwordConfirm: "",
  });

  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);
  const [localError, setLocalError] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // hook de navigation
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Déclaration RTK Query du hook useUpdateUserMutation pour updateUser
  const [updateUser] = useUpdateUserMutation();

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

    // Créez une copie de l'objet formData
    const updatedData = { ...formData };

    // Vérifiez si le champ 'password' est vide
    if (!updatedData.password) {
      // Si le champ 'password' est vide, supprimez les propriétés 'password' et 'passwordConfirm'
      delete updatedData.password;
      delete updatedData.passwordConfirm;
    }

    try {
      dispatch(updateUserStart());

      // La mutation pour updateUser via RTK Query et ".unwrap();"
      const res = await updateUser({
        id: userId._id,
        // Mettre à jour les données à mettre à jour
        data: updatedData,
      }).unwrap();

      if (res.success === false) {
        dispatch(updateUserFailure(res));
        return;
      }
      dispatch(updateUserSuccess(res));
      setUpdateSuccess(true);
      navigate("/sign-in");
    } catch (error) {
      dispatch(updateUserFailure(error));
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
              readOnly
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
            <p className="text-danger mt-5">
              {localError && "Quelque chose ne va pas !"}
            </p>
            <p className="text-success mt-5">
              {updateSuccess &&
                "Les modifications sont mises à jour avec succès !"}
            </p>
          </div>
        </Form>
      </FormContainer>
    </div>
  );
}
