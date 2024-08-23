import Container from "react-bootstrap/Container";
import { Navbar, Nav, Dropdown, Accordion } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link, useLocation } from "react-router-dom";  // Import useLocation
import { Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import "../App.css";

// icons
import {  FaUserCircle , FaSearch, FaHome, FaInfoCircle } from "react-icons/fa";
import { FaCirclePlus, FaBookOpenReader } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();  // Use useLocation to get the current path

  return (
    <Navbar
      expand="lg"
      bg="light"
      variant="light"
      className="bg-transparent"
    >
      <Container
        fluid
        className="d-flex justify-content-between align-items-center font-weight-light m-0 p-0"
      >
        {/* Toggle button and dropdown on the left */}
        <div className="d-flex align-items-center">
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
            <Dropdown.Menu className="custom-dropdown-menu ">
              <Dropdown.Item 
                as={Link} 
                to="/" 
                className={`my-auto text-dark ${location.pathname === '/' && 'active active-header'}`}
              >
                <FaHome 
                aria-hidden="true"
                aria-label="Maison"
                size={18}
                className={`mx-2 text-dark`} />Accueil
              </Dropdown.Item>

              <Dropdown.Divider />

              {/* Accordéon pour les catégories */}
              <Accordion defaultActiveKey="0" >

                <Accordion.Item eventKey="0"  style={{ backgroundColor: '#d4edda' }}>
                  <Accordion.Header  >
                    <FaSearch 
                    aria-hidden="true"
                    aria-label="Loupe"
                    size={18}
                    className={`mx-2 `}/> Rechercher une recette :
                  </Accordion.Header>
                  <Accordion.Body className="text-center">
                    <input className="mx-auto rounded w-100 text-center"
                    placeholder="Nom de la recette ou de l'auteur"/>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                  <Accordion.Header  >
                    <FaSearch 
                    aria-hidden="true"
                    aria-label="Loupe"
                    size={18}
                   
                    className={`mx-2 `}/> Rechercher par catégorie :
                  </Accordion.Header>
                  <Accordion.Body      as={Link} 
                to="/" className="accordionBody ">Toutes</Accordion.Body>

                  <Accordion.Body      as={Link} className="accordionBody "
                to="/" >Apéritifs</Accordion.Body>

                  <Accordion.Body      as={Link} className="accordionBody "
                to="/" >Boissons</Accordion.Body>

                  <Accordion.Body      as={Link} className="accordionBody "
                to="/" >Entrées</Accordion.Body>

                  <Accordion.Body      as={Link} className="accordionBody "
                to="/" >Salades</Accordion.Body>

                  <Accordion.Body      as={Link} className="accordionBody "
                to="/" >Plats</Accordion.Body>

                  <Accordion.Body     as={Link} className="accordionBody "
                to="/"  >Desserts</Accordion.Body>

                  <Accordion.Body     as={Link} className="accordionBody "
                to="/"  >Autres...</Accordion.Body>
                </Accordion.Item>
             
                <Accordion.Item eventKey="2" >
                  <Accordion.Header>
                    <FaSearch 
                    aria-hidden="true"
                    aria-label="Loupe"
                    size={18}
                    className={`mx-2 `}
                    />Par régime alimentaire :
                  </Accordion.Header>
                  <Accordion.Body      as={Link} className="accordionBody "
                to="/" >Anti-cholestérol</Accordion.Body>
                  <Accordion.Body      as={Link} className="accordionBody "
                to="/" >Diabétique</Accordion.Body>                
                  <Accordion.Body      as={Link} className="accordionBody "
                to="/" >Sans gluten</Accordion.Body>
                  <Accordion.Body      as={Link} className="accordionBody "
                to="/" >Traditionnelle</Accordion.Body>
                  <Accordion.Body      as={Link} className="accordionBody "
                to="/" >Végétarien</Accordion.Body>
                  <Accordion.Body     as={Link} className="accordionBody "
                to="/"  >Végane</Accordion.Body>
                  <Accordion.Body      as={Link} className="accordionBody "
                to="/" >Autres...</Accordion.Body>
                </Accordion.Item>
              </Accordion>

              <Dropdown.Divider />

              <Dropdown.Item 
                as={Link} 
                to="/" 
                className={`my-auto text-dark ${location.pathname === '/mon-cahier' && 'active'}`}
              >
                <FaBookOpenReader
                  aria-hidden="true"
                  aria-label="Mon cahier"
                  size={18}
                  className="mx-2"
                />Mon cahier de recettes
              </Dropdown.Item>

              <Dropdown.Item 
                as={Link} 
                to="/" 
                className={`my-auto text-dark ${location.pathname === '/ajouter-recette' && 'active'}`}
              >
                <FaCirclePlus
                  aria-hidden="true"
                  aria-label="ajouter une recette"
                  size={18}
                  className="mx-2"
                />Ajouter une recette
              </Dropdown.Item>

              <Dropdown.Divider />

              <Dropdown.Item
                as={Link}
                to="/about"
                className={`my-auto text-dark ${location.pathname === '/about' && 'active'}`}
              >
                <FaInfoCircle 
                aria-hidden="true"
                aria-label="informations"
                size={18}
                className="mx-2" /> 
                À propos de nous
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {/* Centered Brand */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="mx-auto text-center textWithShadowNavbarBrand fs-1 link-navbarBrand "
        >
          Mon cahier de recettes
        </Navbar.Brand>

        {/* Authentication buttons (Connexion/Inscription) */}
        <div className="d-flex align-items-center">
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
                <Button variant="success" className="me-3 btn btn-success">
                  <FaUserCircle size={26} aria-hidden="true" aria-label="Se connecter" />{" "}
                  
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
