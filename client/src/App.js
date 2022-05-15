import {  BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Search from './pages/Search';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserContextProvider from './contexts/UserContext';
import AuthContainer from './components/AuthModals/AuthContainer';


function App() {
  return (
    <UserContextProvider>
      <Router>   
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />}/>
            <Route path="/search/*" element={<Search />} />
          </Routes>
          <ToastContainer position="top-right"/>
          <AuthContainer />
        </div>
      </Router>
    </UserContextProvider>
  );
}

export default App;
