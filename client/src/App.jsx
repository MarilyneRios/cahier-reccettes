import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOutSuccess } from "./redux/users/userSlice";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (currentUser?.token) {
      try {
        const tokenPayload = JSON.parse(atob(currentUser.token.split(".")[1]));
        const tokenExpirationTime = tokenPayload.exp * 1000;
        const timeUntilExpiration = tokenExpirationTime - Date.now();

        if (timeUntilExpiration <= 0) {
          // Déconnexion immédiate si le token est expiré
          dispatch(signOutSuccess());
          navigate("/sign-in");
        } else {
          // Déconnexion automatique après expiration du token
          const timeout = setTimeout(() => {
            dispatch(signOutSuccess());
            navigate("/sign-in");
          }, timeUntilExpiration);

          return () => clearTimeout(timeout); // Nettoyer le timeout
        }
      } catch (error) {
        console.error("Erreur lors du décodage du token:", error);
        dispatch(signOutSuccess());
        navigate("/sign-in");
      }
    }
  }, [currentUser, dispatch, navigate]);

  return (
    <div className="App">
      <div id="bgGenerale" className="backgroundHome"></div>

      <header>
        <Header />
      </header>

      <main>
        <Container fluid className="p-0 m-0">
          <ToastContainer position="top-right" autoClose={3000} />
          <Outlet />
        </Container>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
