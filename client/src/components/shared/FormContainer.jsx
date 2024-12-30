import { Container, Row, Col } from 'react-bootstrap';
import "./FormContainer.css";

const FormContainer = ({ children, size = 6, className = "" }) => {
  return (
    <Container className=''>
         <Row className='justify-content-md-center my-5'>
      {/** Pour petits écrans (xs) => 12 colonnes  */}
      {/** Pour petits écrans (md) => 6 colonnes  */}
        <Col xs={12} 
          md={size} 
           className='card px-5 py-3 border border-dark bg-white opacity-75 ${className} '>
              {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;



// les props comme 'size' ou 'className' pour personnaliser la largeur et les styles 
// sur le composant dans FromContainer size="12" et className="custom-class" 