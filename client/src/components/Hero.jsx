import { Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaSignOutAlt, FaSignInAlt } from "react-icons/fa";

export default function Hero() {
  return (
    <div className=' py-5'>
    <Container className='d-flex justify-content-center '>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75 border border-dark '>
            <h1 className='text-center mb-4'> Bienvenue sur cette application MERN (MongoDB, Express, React,
                Node.js) avec Bootstrap.</h1>
            <p className='text-center mb-4'>
            Ceci est un modèle d&lsquo; application Web full-stack construite avec
          des fonctionnalités d&lsquo;authentification (JWT) qui peut vous servir de
          template (starter) afin de créer votre APP.
            </p>
            <p className='text-center mb-4'>
            Elle permet aux utilisateurs de s&lsquo;inscrire, de se connecter et de
          se déconnecter, et donne accès à itinéraires protégés uniquement pour
          les utilisateurs authentifiés.
            </p>
            <div className='d-flex'>
                <Link to='/sign-in'>
                    <Button variant='outline-dark'  className='me-3'>
                    <FaSignInAlt /> Connexion
                    </Button>
                </Link>
                <Link to='/sign-up'>
                    <Button variant='success'>
                    <FaSignOutAlt /> Inscription
                    </Button>
                </Link>
            </div>
        </Card>
    </Container>
 </div>
  )
}
