import { Container, Row, Col } from 'react-bootstrap';

const FormContainer = ({ children }) => {
  return (
    <Container >
         <Row className='justify-content-md-center mt-3 '>
      {/** Pour petits écrans (xs) => 12 colonnes  */}
      {/** Pour petits écrans (md) => 6 colonnes  */}
        <Col xs={12} md={6} className='card p-5 border border-dark bg-light'>
              {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;

