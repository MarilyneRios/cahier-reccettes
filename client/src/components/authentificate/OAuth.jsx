import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../../firebase';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { signInSuccess } from '../../redux/users/userSlice';
import { useGoogleSignInMutation } from "../../redux/users/usersApiSlice";

export default function OAuth({ label }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Déclaration RTK Query du hook useGoogleSignInMutation pour GoogleSignIn
  const [googleSignIn] = useGoogleSignInMutation();

  const handleGoogleClick = async () => {
    try {
     // console.log('Début de l\'authentification Google');
      
      // Création d'une instance de fournisseur d'authentification Google
      const provider = new GoogleAuthProvider();
      // Récupération de l'instance d'authentification Firebase
      const auth = getAuth(app);

      // Affichage de la fenêtre pop-up pour l'authentification Google
      const result = await signInWithPopup(auth, provider);
      //console.log('Authentification Google réussie', result.user);

      // Envoi des user data au serveur avec RTK Query
      const { displayName, email, photoURL } = result.user;
      console.log('Données utilisateur à envoyer:', {
        name: displayName,
        email,
        photo: photoURL,
      });

      const res = await googleSignIn({
        name: displayName,
        email,
        photo: photoURL,
      }).unwrap();

      //console.log('Réponse du backend:', res);

      // Dispatch de l'action signInSuccess avec les données utilisateur
      dispatch(signInSuccess(res));
      //console.log('Utilisateur connecté avec succès, redirection en cours');

      // Navigation vers la page home
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la connexion avec Google', error);

      // Vous pouvez également ajouter une vérification pour l'erreur 500
      if (error.status === 500) {
      //  console.error('Erreur 500: Problème du côté serveur');
      }
    }
  };

  return (
    <Button
      type='button'
      variant="outline-dark"
      onClick={handleGoogleClick}
      className='w-100 d-flex align-items-center justify-content-center gap-2'
    >
      <img
        src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
        alt="Google"
        height="25"
        width="25"
      />
      {label}
    </Button>
  );
}
