import { Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaSignOutAlt, FaSignInAlt } from "react-icons/fa";

export default function Hero() {
  return (
    <section  className=" py-5">
      <Container className="d-flex justify-content-center ">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75 border border-dark ">
          <h1 className="text-center mb-4">
            {" "}
            Bienvenue sur Mon cahier de recettes
          </h1>
          <p className="text-center mb-4">
            Cette application de partage de recettes permet d&lsquo;avoir
            facilement à nos recettes ainsi qu&lsquo;aux recettes des autres
            utilisateurs.
          </p>
          <p className="text-center mb-4">
            Après une inscription avec votre adresse e-mail, vous avez accès à
            toutes les recettes stockées sur le site, avec la possibilité
            d&apos;en ajouter aussi.
          </p>
          <p className="text-center mb-4">
          Vous avez également la possibilité de placer vos recettes favorites
            dans &quot;Mes favoris&quot;, afin de constituer votre propre cahier
            de recettes virtuel.
          </p>
          <div className="d-flex">
            <Link to="/sign-in">
              <Button variant="outline-dark" className="me-3">
                <FaSignInAlt /> Connexion
              </Button>
            </Link>
            <Link to="/sign-up">
              <Button variant="success">
                <FaSignOutAlt /> Inscription
              </Button>
            </Link>
          </div>
        </Card>
      </Container>
    </section>
  );
}
