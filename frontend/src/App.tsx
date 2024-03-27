import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import './App.css';
import Auth from "./components/Auth/Auth";
import useAuth from "./components/Auth/hookAuth";
import Dashboard from "./components/Dashboard/Dashboard";
import LoginIn from './components/LogIn/LogIn';
import Navbar from './components/Nav/Navbar';
import SignUp from "./components/SignUp/SignUp";

interface IProps {
  children: React.ReactNode;
}

const PrivateRoute:React.FC<IProps> = ({ children }) => {
  const location = useLocation();
  const { user } = useAuth() || {};
  return (user ? children : <Navigate to='/login' state={{from: location}}/>);
}

const App = () => {

  return (
    <>
      <Auth>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path="/login" element={<LoginIn />}/>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={(
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            )}/>
          </Routes>
        </BrowserRouter>
      </Auth>
    </>
  )
}

export default App
