//App.jsx
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
    <div id="bgGenerale" className='backgroundHome'>

    </div>
    <header className="p-0 m-0">
        <Header style={{ height: '80px' }} className="p-0 m-0" />
    </header>

    <section style={{ minHeight: 'calc(100vh - 80px - 150px)' }}>
        <Container fluid className="w-100 p-0 m-0">
          <Outlet />
        </Container>
    </section>

    <footer className="p-0 m-0">
        <Footer style={{ height: '150px' }}  className="w-100 p-0 m-0"/>
    </footer >
      
    </>
  );
};

export default App;