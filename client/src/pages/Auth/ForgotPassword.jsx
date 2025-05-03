import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
//Composant réutilisable
import FormContainer from "../../components/shared/FormContainer";
//Redux RTK
import {
  useLazyGetUserByEmailQuery,
  useVerifyReponseSecretMutation,
  useResetPasswordRequestMutation,
} from "../../redux/users/usersApiSlice";

//notification
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//////////////////////////////////////////////////////////////////
// ForgotPassword Component
//////////////////////////////////////////////////////////////////
export default function ForgotPassword() {
  // Etats
  const [email, setEmail] = useState("");
  const [reponseSecret, setReponseSecret] = useState("");
  const [showSecret, setShowSecret] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(null);

  // Navigation
  const navigate = useNavigate();

  //////////////////////////////////////////////////////////////
  //vérification email
  //////////////////////////////////////////////////////////////
  // Query RTK
  const [triggerGetUserByEmail, { data: userFound, isFetching }] =
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



  //////////////////////////////////////////////////////////////
  //vérification question et réponse secrète
  //////////////////////////////////////////////////////////////
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
        toast.success("Un email vous a été envoyé !");
        toast.success("⚠️ L'email peut apparaître dans vos spam ! ⚠️");

        await handleSubmitSendResetEmail(); 
        navigate("/");
      } else {
        setError("La réponse secrète est incorrecte.");
        }
    } catch (err) {
      console.error("❌ Erreur lors de la vérification de la réponse secrète :", err);
      setError("Une erreur est survenue. Veuillez réessayer.");
    }
  }

  //////////////////////////////////////////////////////////////
  //envoyer le mail avec un lien pour resetPassword
  //////////////////////////////////////////////////////////////
  const [sendResetEmail, {dataSendResetEmail} ] = useResetPasswordRequestMutation();
  console.log("👤 Résultat de sendResetEmail:", {
    dataSendResetEmail,
    isSuccess,
  });

  const handleSubmitSendResetEmail = async () => {
    try {
      const res = await sendResetEmail({ email }).unwrap();
      console.log("✅ Résultat complet de handleSubmitSendResetEmail:", res);
      setMessage(res.message); // "Email envoyé avec succès"
      return true;
    } catch (err) {
      setMessage(err?.data?.message || 'Erreur lors de l\'envoi de l\'email');
      console.error("❌ Erreur lors de handleSubmitSendResetEmail :", err);
      return false;
    }
  };

  

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
