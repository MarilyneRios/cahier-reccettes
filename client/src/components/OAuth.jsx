import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button,  } from "react-bootstrap";
import { signInSuccess } from '../redux/userSlice';

export default function OAuth(  {label}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
        // Création d'une instance de fournisseur d'authentification Google
        const provider = new GoogleAuthProvider();
        // Récupération de l'instance d'authentification Firebase
        const auth = getAuth(app);

        // Affichage de la fenêtre pop-up pour l'authentification Google
        const result = await signInWithPopup(auth, provider);
       // Envoi des données utilisateur au serveur backend         
        const res = await fetch('/api/auth/google', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: result.user.displayName,
            email: result.user.email,
            photo: result.user.photoURL,
          }),
        });
        // Réponse en JSON
        const data = await res.json();
       // console.log(data);
        // Dispatch de l'action signInSuccess avec les données utilisateur
        dispatch(signInSuccess(data));
        // Navigation vers la page home
        navigate('/');
       
    } catch (error) {
        console.log('connexion avec google impossible', error);
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