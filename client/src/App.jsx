//App.jsx
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

const App = () => {
  return (
    <>
      <section className='backgroundHome '></section>
      <Header />
        <Container fluid className="p-0  container-relative">
        <Outlet />
      </Container>
    </>
  );
};

export default App;


