import Container from "react-bootstrap/Container";
import { Navbar, Nav, Dropdown, Accordion } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import { Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./Header.css";

// icons
import { FaUserCircle, FaSearch, FaHome, FaInfoCircle } from "react-icons/fa";
import { FaCirclePlus, FaBookOpenReader } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import { PiBooksDuotone } from "react-icons/pi";

//element
import SearchBar from "../components/searchBar";


function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation(); // Use useLocation to get the current path

  return (
    <Navbar
      expand="lg"
      bg="light"
      variant="light"
      className="bg-transparent w-100 p-0 m-0"
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
              className="ms-2"
            >
              <RxHamburgerMenu />
            </Dropdown.Toggle>

            {/* Élargir le menu déroulant */}
            <Dropdown.Menu className="custom-dropdown-menu">
              <Dropdown.Item
                as={Link}
                to="/"
                className={`my-auto text-dark ${
                  location.pathname === "/" && "active active-header"
                }`}
              >
                <FaHome
                  aria-hidden="true"
                  aria-label="Maison"
                  size={18}
                  className={`mx-2 text-dark`}
                />
                Accueil
              </Dropdown.Item>

              <Dropdown.Item>
                {/** search bar */}
                <Form className="d-flex align-items-center  mt-3 ">
                  <Form.Control
                    type="search"
                    placeholder="Chercher une recette"
                    className="form-control mx-3 "
                    aria-label="Search"
                  />
                  <Button variant="success" className="btn btn-sm ">
                    <FaSearch aria-hidden="true" aria-label="Loupe" size={28} />
                  </Button>
                </Form>
              </Dropdown.Item>

              <Dropdown.Divider />

              {/* Accordéon pour les catégories */}
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <FaSearch
                      aria-hidden="true"
                      aria-label="Loupe"
                      size={18}
                      className={`mx-2 `}
                    />{" "}
                    Rechercher par catégorie :
                  </Accordion.Header>
                  <Accordion.Body as={Link} to="/" className="accordionBody ">
                    Toutes
                  </Accordion.Body>

                  <Accordion.Body as={Link} className="accordionBody " to="/">
                    Apéritifs
                  </Accordion.Body>

                  <Accordion.Body as={Link} className="accordionBody " to="/">
                    Boissons
                  </Accordion.Body>

                  <Accordion.Body as={Link} className="accordionBody " to="/">
                    Entrées
                  </Accordion.Body>

                  <Accordion.Body as={Link} className="accordionBody " to="/">
                    Salades
                  </Accordion.Body>

                  <Accordion.Body as={Link} className="accordionBody " to="/">
                    Plats
                  </Accordion.Body>

                  <Accordion.Body as={Link} className="accordionBody " to="/">
                    Desserts
                  </Accordion.Body>

                  <Accordion.Body as={Link} className="accordionBody " to="/">
                    Autres...
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    <FaSearch
                      aria-hidden="true"
                      aria-label="Loupe"
                      size={18}
                      className={`mx-2 `}
                    />
                    Par régime alimentaire :
                  </Accordion.Header>

                  <Accordion.Body as={Link} className="accordionBody " to="/">
                    Traditionnelle
                  </Accordion.Body>
                  <Accordion.Body as={Link} className="accordionBody " to="/">
                    Végétarien
                  </Accordion.Body>
                  <Accordion.Body as={Link} className="accordionBody " to="/">
                    Végane
                  </Accordion.Body>
                  <Accordion.Body as={Link} className="accordionBody " to="/">
                    Sans gluten
                  </Accordion.Body>
                  <Accordion.Body as={Link} className="accordionBody " to="/">
                    Autres...
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

              <Dropdown.Divider />
              <Dropdown.Item
                as={Link}
                to="/viewRecipes"
                className={`my-auto text-dark ${
                  location.pathname === "/viewRecipes" && "active"
                }`}
              >
                <PiBooksDuotone
                  aria-hidden="true"
                  aria-label="ajouter une recette"
                  size={20}
                  className="mx-2 text-black"
                />
                Toutes les recettes
              </Dropdown.Item>

              <Dropdown.Item
                as={Link}
                to="/"
                className={`my-auto text-dark ${
                  location.pathname === "/mon-cahier" && "active"
                }`}
              >
                <FaBookOpenReader
                  aria-hidden="true"
                  aria-label="Mon cahier"
                  size={18}
                  className="mx-2"
                />
                Mon cahier de recettes
              </Dropdown.Item>

              <Dropdown.Item
                as={Link}
                to="/"
                className={`my-auto text-dark ${
                  location.pathname === "/ajouter-recette" && "active"
                }`}
              >
                <FaCirclePlus
                  aria-hidden="true"
                  aria-label="ajouter une recette"
                  size={18}
                  className="mx-2"
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
                  size={18}
                  className="mx-2"
                />
                À propos de nous
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {/* Centered Brand */}


       {/* Centre : Liens */}
<div className="d-lg-flex flex-row align-items-center mx-auto">
  <Navbar.Brand
    as={Link}
    to="/favorite"
    className="text-center textWithShadowNavbarBrand link-navbarBrand"
  >
    <span className="d-none d-sm-inline">
    <FaBookOpenReader
      aria-hidden="true"
      aria-label="Mon cahier de recette"
      size={25}
      className="mx-3"
    />
    </span>
  
    <span className=" fs-6 fs-sm-5 fs-md-4 fs-lg-3">Mon cahier de recettes</span>
  </Navbar.Brand>
</div>


        {/* Centre : Barre de recherche*/}
        <div className="d-none d-lg-flex flex-column align-items-center mx-auto">
          <SearchBar />
        </div>

        <div className="d-none d-lg-flex flex-row align-items-center mx-auto">
          <Navbar.Brand
            as={Link}
            to="/"
            className="text-center textWithShadowNavbarBrand fs-1 link-navbarBrand"
          >
            <FaHome
              aria-hidden="true"
              aria-label="Maison"
              title="Accueil"
              size={25}
              className=""
            />
            <span className="tooltip-text">Accueil</span>
          </Navbar.Brand>
          <Navbar.Brand
            as={Link}
            to="/favorite"
            className=" text-center textWithShadowNavbarBrand fs-4 link-navbarBrand"
          >
            <PiBooksDuotone
              aria-hidden="true"
              aria-label="Toutes les recettes"
              title="Toutes les recettes"
              size={28}
              className="mx-3"
            />
            <span className="tooltip-text">Les recettes</span>
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
              size={25}
              className=""
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
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "defaultProfilePicture.png";
                }}
                className="border border-dark"
                style={{
                  height: "3.5rem",
                  width: "3.5rem",
                  objectFit: "cover",
                }}
              />
            </Link>
          ) : (
            <>
              <Nav.Link as={Link} to="/sign-in" className="p-0">
                <Button variant="success" className=" btn btn-success">
                  <FaUserCircle
                    size={26}
                    aria-hidden="true"
                    aria-label="Se connecter"
                  /> <span className="d-none d-sm-inline"> Connexion</span>
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
