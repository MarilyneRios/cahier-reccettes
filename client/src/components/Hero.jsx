import { Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUserCircle, FaUserPlus } from "react-icons/fa";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="MiseEnFormeHome ">
      <Container className="d-flex justify-content-center align-items-center ">
        <Card
          className="text-white p-5  d-flex flex-column align-items-center w-75 cardBg"
        >
          <h1 className="  mb-4  textWithShadow fst-italic" >
            Partage tes recettes préférées comme au bon vieux temps de nos grand-mères.
          </h1>

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
