import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Logo from "../assets/logoDevGreen.png";

function Header() {
  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  return (
    <Navbar
      expand="lg"
      bg="light"
      variant="light"
      data-bs-theme="light"
      className="border-bottom border-dark"
    >
      <Container fluid>
        {/** Titre */}
        <Image
          src={Logo}
          className="rounded-circle mx-3 img-fluid"
          alt="Logo"
          style={{
            height: "3rem",
            width: "3rem",
            objectFit: "cover",
          }}
        />
        <Navbar.Brand as={Link} to="/" className="text-dark fs-4">
          Auth React-Bootstrap
        </Navbar.Brand>

        {/** Btns or profile picture on small screens */}
        <div className="d-lg-none d-flex align-items-center">
          {currentUser ? (
            <Link
              to="/profile"
              className="text-dark"
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
                <Button variant="dark" className="mx-1">
                  <FaSignInAlt /> Connexion
                </Button>
              </Nav.Link>
              <Nav.Link as={Link} to="/sign-up" className="p-0">
                <Button variant="outline-dark" className="mx-1">
                  <FaSignOutAlt /> Inscription
                </Button>
              </Nav.Link>
            </>
          )}
        </div>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/** Liens and buttons on large screens */}
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-between w-100"
        >
          <div className="d-flex justify-content-center flex-grow-1">
            <Nav className="mx-auto mb-2 mb-lg-0">
              <Nav.Link as={Link} to="/" className="my-auto text-dark">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/about" className="my-auto text-dark">
                A propos
              </Nav.Link>
            </Nav>
          </div>

          <div className="d-none d-lg-flex align-items-center">
            {currentUser ? (
              <>
                <Link
                  to="/profile"
                  className="text-dark"
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
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/sign-in" className="p-0">
                  <Button variant="outline-dark" className="mx-1">
                    <FaSignInAlt /> Connexion
                  </Button>
                </Nav.Link>
                <Nav.Link as={Link} to="/sign-up" className="p-0">
                  <Button variant="success" className="mx-1">
                    <FaSignOutAlt /> Inscription
                  </Button>
                </Nav.Link>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
