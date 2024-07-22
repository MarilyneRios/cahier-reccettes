/*
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';

function App() {
  return (
    <>
      <Header />
      <ToastContainer />
      <Container className='my-2'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
*/

import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

const App = () => {
  return (
    <>
      <Header />
        <Container className='my-2'>
        <Outlet />
      </Container>
    </>
  );
};

export default App;


/*
const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <ToastContainer />
      <Container className='my-2'>
        <Routes>
          <Route path='/' element={<Outlet />}>
            <Route index element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/sign-in' element={<SignIn />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route element={<PrivateRoute />}>
              <Route path='/profile' element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
*/
