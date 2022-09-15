import GlobalStyle from "../styles/GlobalStyle";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { useState, useEffect } from "react";
import { getSession } from '../services/my-pets';
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Home from "./Home";

export default function App() {
  return (
      <BrowserRouter>
          <Root />
      </BrowserRouter>
  );
}

function Root() {
  const[user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
      const local = JSON.parse(localStorage.getItem('myWallet'));
      
      if(local) {
        const promise = getSession(local.token);

        promise.then(answer => {    
                setUser(local);
                navigate('/home');    
        });
      }    
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </UserContext.Provider>
  );
}
