import { Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUserCircle, FaUserPlus } from "react-icons/fa";
import "../App.css";

export default function Hero() {
  return (
    <section className="hero">
      <Container className="d-flex justify-content-center align-items-center">
        <Card
          className="text-white p-5 d-flex flex-column align-items-center hero-card w-50"
        >
          <h1 className="card-title text-center mb-4 fst-italic">
            Partage tes recettes préférées comme au bon vieux temps de nos grand-mères.
          </h1>
          <br></br>
          <p className="text-center mb-4 fs-4">
            Après votre inscription avec une adresse e-mail, vous aurez accès à
            toutes les recettes disponibles sur le site, et pourrez également en
            ajouter.
          </p>
          <br></br>
          <p className="text-center mb-4 fs-4">
            Vous avez également la possibilité de placer vos recettes favorites
            dans &quot;Mes favoris&quot;, afin de constituer votre propre cahier
            de recettes virtuel.
          </p>
          <br></br>
          <div className="d-flex">
            <Link to="/sign-in">
              <Button variant="success" className="me-3">
                <FaUserCircle size={26} aria-hidden="true" aria-label="Se connecter" /> Connexion
              </Button>
            </Link>
            <Link to="/sign-up">
              <Button variant="secondary">
                <FaUserPlus size={20} aria-hidden="true" aria-label="S'inscrire" /> Inscription
              </Button>
            </Link>
          </div>
        </Card>
      </Container>
    </section>
  );
}
