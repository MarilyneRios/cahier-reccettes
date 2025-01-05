//App.jsx
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';


const App = () => {
  return (
    <div >
    <div id="bgGenerale" 
    className='backgroundHome'
   >
    </div>
   
    <header className="">
        <Header  />
    </header>

    <main className=""> 
        <Container fluid className="p-0 m-0">
          <Outlet />
        </Container>
      </main>
   
  
    <footer  className="">
        <Footer   />
    </footer >
   
    </div>
  );
};

export default App;