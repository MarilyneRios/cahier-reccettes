//App.jsx
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <div >
    <div id="bgGenerale" className='backgroundHome'>
    </div>
   
    <header>
        <Header  />
    </header>

    
        <Container fluid className="p-0 m-0" >
          <Outlet />
        </Container>
   
  
    <footer >
        <Footer   />
    </footer >
   
    </div>
  );
};

export default App;