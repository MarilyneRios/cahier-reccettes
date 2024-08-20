
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { RxHamburgerMenu } from "react-icons/rx";

function Header() {
  return (
    <Navbar bg="light" expand="lg">
      {/* Marque de la barre de navigation */}
      <Navbar.Brand href="#home">Mon Site Web</Navbar.Brand>

      {/* Icône du menu hamburger */}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      {/* Contenu du menu de navigation */}
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {/* Liens de navigation */}
          <Nav.Link href="#link1">Lien 1</Nav.Link>
          <Nav.Link href="#link2">Lien 2</Nav.Link>

          {/* Menu déroulant */}
          <Dropdown>
            {/* Bouton du menu déroulant */}
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            <RxHamburgerMenu />
            </Dropdown.Toggle>

            {/* Options du menu déroulant */}
            <Dropdown.Menu>
              <Dropdown.Item href="#action1">Action 1</Dropdown.Item>
              <Dropdown.Item href="#action2">Action 2</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#action3">Action 3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
