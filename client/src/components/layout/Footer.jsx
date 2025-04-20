import { Link } from "react-router-dom";
// icons
import { FaHome } from "react-icons/fa";
import { FaCirclePlus, FaBookOpenReader } from "react-icons/fa6";
import { PiBooksDuotone } from "react-icons/pi";

function Footer() {
  return (
    <footer className="container-fluid panel-footer p-4 bg-light text-dark fs-6 mt-5 border-top shadow">
      <div className="row text-center text-md-start">
        <div className="col-md-4 mb-4">
          <h5 className="fw-bold border-bottom pb-2">À propos</h5>
          <p>Bienvenue sur notre application de partage de recettes !</p>
          <p>
            Découvrez, partagez et savourez des recettes délicieuses 
            <br></br>avec votre famille et vos amis.
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
              rios.marilyne.dev@gmail.com
            </a>
          </p>
          <p>Téléphone : +33 7 81 14 19 69</p>
        </div>
      </div>

      <hr />
      <div className="row text-center">
        <div className="col-12">
          <p className="fst-italic mb-3 text-center">
            Copyright © 2025 by Marilyne Rios. Tous droits réservés.
          </p>
          <div className="d-flex justify-content-center row text-center mt-3">
            <div className="col-12">
              <p className="text-center">
                Ce site utilise uniquement des cookies techniques nécessaires à
                la navigation et au bon fonctionnement de l&apos;application. <br></br>Aucun
                cookie publicitaire ou de suivi n&apos;est utilisé., vous acceptez
                notre{" "}
                <Link to="/privacy-policy" className="text-success">
                  Politique de Confidentialité
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
      {/**bas du footer*/}
    </footer>
  );
}

export default Footer;
