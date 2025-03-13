import { Link } from "react-router-dom";
// icons
import { FaUserCircle, FaHome, FaInfoCircle } from "react-icons/fa";
import { FaCirclePlus, FaBookOpenReader } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import { PiBooksDuotone } from "react-icons/pi";

function Footer() {
  return (
    <footer className="container-fluid panel-footer p-4 bg-light text-dark fs-6 mt-5 border-top shadow">
      <div className="row text-center text-md-start">
        <div className="col-md-4 mb-4">
          <h5 className="fw-bold border-bottom pb-2">À propos</h5>
          <p>Bienvenue sur notre application de partage de recettes !</p>
          <p>
            Découvrez, partagez et savourez des recettes délicieuses avec vos
            amis.
          </p>
        </div>
        <div className="col-md-4 mb-4">
          <h5 className="fw-bold border-bottom pb-2">Liens utiles</h5>
          <ul className="list-unstyled">
            <li className="my-2">
              <Link to="/" className="text-decoration-none text-dark">
                <FaHome
                  size={20}
                  className="me-2 text-success image3D"
                  aria-hidden="true"
                />
                Accueil
              </Link>
            </li>
            <li className="my-2">
              <Link
                to="/viewRecipes"
                className="text-decoration-none text-dark"
              >
                <PiBooksDuotone
                  size={20}
                  className="me-2 text-success image3D"
                  aria-hidden="true"
                />
                Toutes les recettes
              </Link>
            </li>
            <li className="my-2">
              <Link to="/addRecipe" className="text-decoration-none text-dark">
                <FaCirclePlus
                  size={20}
                  className="me-2 text-success image3D"
                  aria-hidden="true"
                />
                Ajouter une recette
              </Link>
            </li>
            <li className="my-2">
              <Link
                to="/allFavoriteRecipe"
                className="text-decoration-none text-dark"
              >
                <FaBookOpenReader
                  size={20}
                  className="me-2 text-success image3D"
                  aria-hidden="true"
                />
                Mon cahier de recettes
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-md-4 mb-4">
          <h5 className="fw-bold border-bottom pb-2">Contact</h5>
          <p>
            Email :{" "}
            <a
              href="mailto:rios.marilyne@gmail.com"
              className="text-success text-decoration-underline"
            >
              rios.marilyne@gmail.com
            </a>
          </p>
          <p>Téléphone : +33 1 23 45 67 89</p>
        </div>
      </div>

      <hr />
      <div className="row text-center">
        <div className="col-12">
          <p className="fst-italic mb-3">
            Copyright © 2025 by Marilyne Rios. Tous droits réservés.
          </p>
          <div className="d-flex justify-content-center row text-center mt-3">
            <div className="col-12">
              <p className="">
                Nous utilisons des cookies pour améliorer votre expérience. En
                continuant, vous acceptez notre{" "}
                <Link to="/privacy-policy" className="text-success">
                  Politique de Confidentialité
                </Link>
                .
              </p>
            </div>
          </div>
          <div className="d-flex ">
            <p>
              Cette application a été créée avec <strong>Vite</strong>,{" "}
              <strong>Bootstrap</strong>, <strong>Express.js</strong>,{" "}
              <strong>Node.js</strong> et <strong>MongoDB</strong>.
            </p>

            <a
              href="https://github.com/MarilyneRios"
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none text-success fw-bold mx-3"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/marilyne-rios-59a13015b"
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none text-success fw-bold"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
      {/**bas du footer*/}
    </footer>
  );
}

export default Footer;
