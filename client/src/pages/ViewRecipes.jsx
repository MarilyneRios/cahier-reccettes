import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import CardRecipe from "../components/CardRecipe";

// css
import "./ViewRecipes.css";

const viewRecipes = () => {
  return (

    <Container className="d-flex flex-column align-items-center py-3">
    {/* Titre */}
    <h2 className="text-center my-3 fst-italic">Nos Recettes</h2>

    {/* Cartes en grille */}
    <Row className="justify-content-center g-4 mb-3">
      <Col md={4} className="d-flex justify-content-center ">
        <CardRecipe />
      </Col>
      <Col md={4} className="d-flex justify-content-center">
        <CardRecipe />
      </Col>
      <Col md={4} className="d-flex justify-content-center">
        <CardRecipe />
      </Col>
    </Row>
    <Row className="justify-content-center g-4">
      <Col md={4} className="d-flex justify-content-center">
        <CardRecipe />
      </Col>
      <Col md={4} className="d-flex justify-content-center">
        <CardRecipe />
      </Col>
      <Col md={4} className="d-flex justify-content-center">
        <CardRecipe />
      </Col>
    </Row>
  </Container>

  );
};

export default viewRecipes;

    /* <div
      id="viewRecipes"
      className="d-flex flex-column justify-content-center align-items-center text-white text-center fs-2 my-3"
    >
    
      <h2 className="text-center mb-3 fst-italic">Nos Recettes</h2>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 ">
  
        <div className="col">
          <CardRecipe />
        </div>
        <div className="col">
          <CardRecipe />
        </div>
        <div className="col">   
        <CardRecipe />
        </div>
        <div className="col">
          <CardRecipe />
        </div>
        <div className="col">
          <CardRecipe />
        </div>
        <div className="col">
          <CardRecipe />
        </div>
      </div>
    </div> */