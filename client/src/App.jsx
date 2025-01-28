//App.jsx
/*
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

export default App;*/

import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOutSuccess } from "./redux/users/userSlice";

function App() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (currentUser?.token) {
      const tokenExpirationTime = JSON.parse(atob(currentUser.token.split(".")[1])).exp * 1000;
      const timeUntilExpiration = tokenExpirationTime - Date.now();

      if (timeUntilExpiration <= 0) {
        // Déconnecter immédiatement si le token est expiré
        dispatch(signOutSuccess());
      } else {
        // Déconnecter automatiquement après expiration
        const timeout = setTimeout(() => {
          dispatch(signOutSuccess());
        }, timeUntilExpiration);

        return () => clearTimeout(timeout); // Nettoyer le timeout au changement
      }
    }
  }, [currentUser, dispatch]);

  return (
    <div className="App">
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
}

export default App;
