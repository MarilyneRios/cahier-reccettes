import { Container, Row, Col } from 'react-bootstrap';
import "./formContainer.styles.css";

const FormContainer = ({ children, size = 6, className = "" }) => {
  return (
    <Container>
         <Row className='justify-content-md-center my-3'>
      {/** Pour petits écrans (xs) => 12 colonnes  */}
      {/** Pour petits écrans (md) => 6 colonnes  */}
        <Col xs={12} 
          md={size} 
           className='card px-5 py-3 border border-dark bg-white opacity-sign ${className} '>
              {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;



// les props comme 'size' ou 'className' pour personnaliser la largeur et les styles 
// sur le composant dans FromContainer size="12" et className="custom-class" 