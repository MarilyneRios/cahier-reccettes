import Container from "react-bootstrap/Container";
import { Navbar, Nav, Dropdown,  } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import { Link, useLocation } from "react-router-dom";
import { Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Header.css";

// icons
import { FaUserCircle, FaHome, FaInfoCircle } from "react-icons/fa";
import { FaCirclePlus, FaBookOpenReader } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import { PiBooksDuotone } from "react-icons/pi";

//element
import FilterComponent from "../shared/FilterComponent";
import SearchBar from "../shared/searchBar";



///////////////////////////////////////////////////////////////////////
// Header component
///////////////////////////////////////////////////////////////////////
function Header() {
  const { currentUser } = useSelector((state) => state.user);

  // Use useLocation to get the current path
  const location = useLocation();
  const navigate = useNavigate();

  ///////////////////////////////////////////////////////////////////////
  // fonction pour  gérer l'ouverture de la page d'accueil
  ///////////////////////////////////////////////////////////////////////
  const handleHomeClick = () => {
    navigate("/");
    // Faire défiler jusqu'à la section HeroHome après un délai
    setTimeout(() => {
      const section = document.getElementById("HeroHome");
      if (section) {
        const offset = -100; // Ajustez pour voir le header du haut
        const elementPosition =
          section.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition + offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 100); // Le délai
  };

  ///////////////////////////////////////////////////////////////////////
  // fonction pour afficher les recettes
  ///////////////////////////////////////////////////////////////////////

  const handleViewRecipeClick = () => {
    navigate("/");
    setTimeout(() => {
      const section = document.getElementById("ViewRecipesHome");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  ///////////////////////////////////////////////////////////////////////
  // fonction pour trier les  categories
  ///////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////////
  // fonction pour trier les regimes
  ///////////////////////////////////////////////////////////////////////

  return (
    <Navbar
      expand="lg"
      bg="light"
      variant="light"
      className="bg-transparent w-100 p-0 m-0 headerD"
    >
      <Container
        fluid
        className="d-flex justify-content-between align-items-center font-weight-light  bg-overlay w-100 p-0 m-0"
      >
        {/* Toggle button and dropdown on the left */}
        <div className="d-flex align-items-center me-3 ">
          {/* Menu déroulant */}
          <Dropdown>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              className="ms-2 btnNav"
            >
              <RxHamburgerMenu />
            </Dropdown.Toggle>

            {/* Élargir le menu déroulant */}
            <Dropdown.Menu className="custom-dropdown-menu">
              <Dropdown.Item
                as={Link}
                onClick={handleHomeClick}
                className={`my-auto text-dark ${
                  location.pathname === "/" && "active active-header"
                }`}
              >
                <FaHome
                  aria-hidden="true"
                  aria-label="Maison"
                  size={25}
                  className={`mx-2 text-dark image3D rounded-pill p-1`}
                />
                Accueil
              </Dropdown.Item>

              <Dropdown.Divider />

              {/* les filters (Accordéon) dans le toggle  */}
              <FilterComponent />

               {/* les liens dans le toggle */}
              <Dropdown.Divider />
                <Dropdown.Item
                  as={Link}
                  onClick={handleViewRecipeClick}
                  className={`my-auto text-dark ${
                    location.pathname === "/viewRecipes" && "active"
                  }`}
                >
                  <PiBooksDuotone
                    aria-hidden="true"
                    aria-label="ajouter une recette"
                    size={25}
                    className="mx-2 text-black image3D rounded-pill p-1"
                  />
                  Toutes les recettes
                </Dropdown.Item>

                <Dropdown.Item
                  as={Link}
                  to="/allFavoriteRecipe"
                  className={`my-auto text-dark ${
                    location.pathname === "/mon-cahier" && "active"
                  }`}
                >
                  <FaBookOpenReader
                    aria-hidden="true"
                    aria-label="Mon cahier"
                    size={25}
                    className="mx-2 image3D rounded-pill p-1"
                  />
                  Mon cahier de recettes
                </Dropdown.Item>

                <Dropdown.Item
                  as={Link}
                  to="/addRecipe"
                  className={`my-auto text-dark ${
                    location.pathname === "/ajouter-recette" && "active"
                  }`}
                >
                  <FaCirclePlus
                    aria-hidden="true"
                    aria-label="ajouter une recette"
                    size={25}
                    className="mx-2 image3D rounded-pill p-1"
                  />
                  Ajouter une recette
                </Dropdown.Item>

              <Dropdown.Divider />

              <Dropdown.Item
                as={Link}
                to="/about"
                className={`my-auto text-dark ${
                  location.pathname === "/about" && "active"
                }`}
              >
                <FaInfoCircle
                  aria-hidden="true"
                  aria-label="informations"
                  size={25}
                  className="mx-2 image3D rounded-pill p-1"
                />
                À propos de nous
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {/* Centered Brand */}

        {/* plus liens favoris */}
        <div className=" d-none d-lg-flex flex-row align-items-center mx-auto">
          <Navbar.Brand
            as={Link}
            to="/allFavoriteRecipe"
            className="text-center link-navbarBrand btnNav rounded-pill px-2 mb-1 border border-white"
          >
            <span className="d-none d-sm-inline ">
              <FaBookOpenReader
                aria-hidden="true"
                aria-label="Mon cahier de recette"
                size={22}
                className=" mb-2  mx-1 "
              />
            </span>
            <span className="fs-5 fs-sm-5 fs-md-4 fs-lg-3 d-none d-sm-inline mx-1 ">
              Mon cahier de recettes
            </span>
          </Navbar.Brand>
        </div>

        {/* Centre : Barre de recherche */}
        <div className="d-flex justify-content-center align-items-center w-50  m-3">
          <div className="w-100">
            <div className="">
              <SearchBar />
            </div>
          </div>
        </div>

        <div className="d-none d-lg-flex flex-row align-items-center mx-auto">
          <Navbar.Brand
            as={Link}
            onClick={handleHomeClick}
            className="text-center textWithShadowNavbarBrand fs-1 link-navbarBrand"
          >
            <FaHome
              aria-hidden="true"
              aria-label="Maison"
              title="Accueil"
              size={30}
              className="btnNav rounded-pill p-1 border border-white"
            />
            <span className="tooltip-text">Accueil</span>
          </Navbar.Brand>
          <Navbar.Brand
            as={Link}
            onClick={handleViewRecipeClick}
            className=" text-center textWithShadowNavbarBrand fs-4 link-navbarBrand"
          >
            <PiBooksDuotone
              aria-hidden="true"
              aria-label="Toutes les recettes"
              title="Toutes les recettes"
              size={30}
              className="mx-2 btnNav rounded-pill p-1 border border-white"
            />
            <span className="tooltip-text">Les recettes</span>
          </Navbar.Brand>
          <Navbar.Brand
            as={Link}
            to="/addRecipe"
            className=" text-center textWithShadowNavbarBrand fs-1 link-navbarBrand"
          >
            <FaCirclePlus
              aria-hidden="true"
              aria-label="ajouter une recette"
              title="Ajouter une recette"
              size={30}
              className="btnNav rounded-pill"
            />
            <span className="tooltip-text">Ajouter une recette</span>
          </Navbar.Brand>
          <Navbar.Brand
            as={Link}
            to="/about"
            className=" text-center textWithShadowNavbarBrand fs-1 link-navbarBrand"
          >
            <FaInfoCircle
              aria-hidden="true"
              aria-label="A propos de nous"
              title="A propos de nous"
              size={30}
              className="btnNav mx-2 rounded-pill"
            />
            <span className="tooltip-text">A propos de nous</span>
          </Navbar.Brand>
        </div>
        {/* Authentication buttons (Connexion/Inscription) */}
        <div className="d-flex align-items-center me-3">
          {currentUser ? (
            <Link
              to="/profile"
              className="text-white"
              style={{ textDecoration: "none" }}
            >
              <Image
                src={currentUser.profilePicture}
                alt="profile"
                roundedCircle
                //onClick={handleProflieBtn}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "defaultProfilePicture.png";
                }}
                className="border border-dark imageBtn btnNav"
              />
            </Link>
          ) : (
            <>
              <Nav.Link as={Link} to="/sign-in" className="p-0">
                <Button variant="success" className=" btn btn-success image3D">
                  <FaUserCircle
                    size={26}
                    aria-hidden="true"
                    aria-label="Se connecter"
                  />{" "}
                  <span className="d-none d-sm-inline"> Connexion</span>
                </Button>
              </Nav.Link>
            </>
          )}
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;
