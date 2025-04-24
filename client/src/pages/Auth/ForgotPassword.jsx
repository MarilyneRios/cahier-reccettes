import { useState } from "react";
import FormContainer from "../../components/shared/FormContainer";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  useLazyGetUserByEmailQuery,
  useVerifyReponseSecretMutation,
} from "../../redux/users/usersApiSlice";

//////////////////////////////////////////////////////////////////
// ForgotPassword Component
//////////////////////////////////////////////////////////////////
export default function ForgotPassword() {
  // Etats
  const [email, setEmail] = useState("");
  const [reponseSecret, setReponseSecret] = useState("");
  const [showSecret, setShowSecret] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(null);

  // Navigation
  const navigate = useNavigate();

  // Query RTK
  const [triggerGetUserByEmail, { data: userFound, isLoading, isFetching }] =
    useLazyGetUserByEmailQuery();

  /* console.log("👤 Résultat de useGetUserByEmailQuery:", {
    email,
    userFound,
    isLoading,
    isFetching,
  
  });*/

  // email  vérification
  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    console.log("📤 Formulaire email soumis avec:", email);
    setError(null);
    setShowSecret(false);

    try {
      const data = await triggerGetUserByEmail({ email }).unwrap();

      //console.log("✅ Utilisateur trouvé:", data);

      if (data?.questionSecret) {
        setShowSecret(true);
      } else {
        // console.warn("❌ Aucun utilisateur trouvé avec cet email.");
        setError("Aucun utilisateur trouvé avec cet email.");
      }
    } catch (err) {
      //console.error("❌ Erreur dans handleSubmitEmail:", err);
      setError("Une erreur est survenue. Veuillez réessayer.");
    }
  };
  // handleSubmitEmail ok


  // Query RTK
  const [verifyReponseSecret, { verifyReponseSecretData, isSuccess }] =
    useVerifyReponseSecretMutation();
  console.log("👤 Résultat de verifyReponseSecret:", {
    verifyReponseSecretData,
    isSuccess,
  });

  // ReponseSecret vérification
  const handleSubmitReponse = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await verifyReponseSecret({ email, reponseSecret }).unwrap();
      console.log("✅ Résultat complet de verifyReponseSecret:", res);
    
      if (res.success) {
        alert("Réponse correcte !");
        navigate("/");
      } else {
        setError("La réponse secrète est incorrecte.");
      }
    } catch (err) {
      console.error("❌ Erreur lors de la vérification de la réponse secrète :", err);
      setError("Une erreur est survenue. Veuillez réessayer.");
    }
  }


  return (
    <FormContainer>
      <h1 className="text-center text-dark">
        Réinitialisation du mot de passe
      </h1>

      <Form onSubmit={showSecret ? handleSubmitReponse : handleSubmitEmail}>
        {/* Email Input */}
        <Form.Group className="my-3">
          <Form.Label htmlFor="email">Email :</Form.Label>
          <Form.Control
            type="email"
            id="email"
            placeholder="Entrez votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        {/* Secret Question */}
        {showSecret && userFound?.questionSecret && (
          <>
            <div className="mb-2 text-center">
              <h3 className="fs-5 title-border">{userFound.questionSecret}</h3>
            </div>

            <Form.Group className="my-3">
              <Form.Label htmlFor="reponseSecret">Réponse secrète :</Form.Label>
              <Form.Control
                type="text"
                id="reponseSecret"
                placeholder="Entrez votre réponse"
                value={reponseSecret}
                onChange={(e) => setReponseSecret(e.target.value)}
                required
              />
            </Form.Group>
          </>
        )}

        {/* Error Alert */}
        {error && (
          <Alert variant="danger" className="text-center">
            {error}
          </Alert>
        )}

        {/* Submit Button */}
        <div className="d-grid gap-2 mt-3">
          <Button
            type="submit"
            variant="danger"
            disabled={isLoading || isFetching}
          >
            {isLoading || isFetching
              ? "Chargement..."
              : showSecret
              ? "Vérifier la réponse"
              : "Valider l'email"}
          </Button>
        </div>
      </Form>
    </FormContainer>
  );
}
