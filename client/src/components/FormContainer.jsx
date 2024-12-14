import { Container, Row, Col } from 'react-bootstrap';
import "./FormContainer.css";

const FormContainer = ({ children }) => {
  return (
    <Container className=''>
         <Row className='justify-content-md-center mt-5'>
      {/** Pour petits écrans (xs) => 12 colonnes  */}
      {/** Pour petits écrans (md) => 6 colonnes  */}
        <Col xs={12} md={6} className='card px-5 py-3 border border-dark bg-white opacity-75 '>
              {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;

