import { Container, Card } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PiBooksDuotone } from "react-icons/pi";
import { FaCirclePlus, FaBookOpenReader } from "react-icons/fa6";
import "./hero.styles.css";

export default function HeroConnect() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
    setTimeout(() => {
      const section = document.getElementById("ViewRecipesHome");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <section className="MiseEnFormeHome">
      <Container className="d-flex justify-content-center align-items-center">
        <Card className="text-white p-5 d-flex flex-column align-items-center w-75 hero-card">
          <h1 className="mb-4 textWithShadow fst-italic text-center">
            Partage tes recettes préférées comme au bon vieux temps de nos
            grand-mères en toute simplicité et bienveillance.
          </h1>

          <div className="d-flex mt-3 bg-white p-3 rounded">
            <Link to="/allFavoriteRecipe"
             className="d-flex flex-column align-items-center mx-3">
              <FaBookOpenReader
                aria-hidden="true"
                aria-label="Mon cahier de recette"
                title="Mon cahier de recettes"
                size={25}
                className="text-success icon"
              />
              <span className="tooltip-text">Mon cahier de recettes</span>
            </Link>
            <Link
               onClick={handleHomeClick}
              className="d-flex flex-column align-items-center mx-3"
            >
              <PiBooksDuotone
                aria-hidden="true"
                aria-label="Toutes les recettes"
                title="Toutes les recettes"
                size={28}
                className="text-success icon"
              />
              <span className="tooltip-text">Les recettes</span>
            </Link>
            <Link
             
              to="addRecipe"
              className="d-flex flex-column align-items-center mx-3"
            >
              <FaCirclePlus
                aria-hidden="true"
                aria-label="Ajouter une recette"
                title="Ajouter une recette"
                size={25}
                className="text-success icon"
              />
              <span className="tooltip-text">Ajouter une recette</span>
            </Link>
          </div>
        </Card>
      </Container>
    </section>
  );
}
