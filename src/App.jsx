import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import CreatePet from "./components/CreatePet";
import ViewPets from "./components/ViewPets";
import AuthPage from './components/Auth/AuthPage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import HarryPotterCharacters from './HarryPotterCharacters'; 
import './styles.css';

function App() {

 
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Comprovar si l'usuari està loguejat
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !isLoggedIn) {
      setIsLoggedIn(true);
      navigate("/home"); // Redirigeix a Home només si no estem loguejats
    } else if (!token && isLoggedIn) {
      setIsLoggedIn(false);
      navigate("/"); // Redirigeix a la pàgina de login si no hi ha token
    }
  }, [navigate, isLoggedIn]);

  // Gestió del logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="App">
      
       <HarryPotterCharacters /> 
       <div className="container">
        <div className="hp-character griffindor" role="img" aria-label="Harry Potter">
          <button onClick={() => navigate("/create-pet")} className="create-pet-btn">Create Pet</button>
        </div>
        <div className="hp-character slytherin" role="img" aria-label="Draco Malfoy"></div>
        <div className="hp-character ravenclaw" role="img" aria-label="Luna Lovegood">
          <button onClick={() => navigate("/view-pets")} className="view-pets-btn">View All Pets</button>
        </div>
        <div className="hp-character hufflepuff" role="img" aria-label="Cedric Diggory"></div>
      </div>
      <nav>
        <button onClick={() => navigate("/home")} style={{ marginRight: '10px' }}>Home</button>
        {isLoggedIn ? (
          <>
            <button onClick={handleLogout}>Log Out</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate("/login")}>Log In</button>
            <button onClick={() => navigate("/register")}>Register</button>
          </>
        )}
      </nav>
      <Routes>
        {/* Rutes d'autenticació */}
        <Route path="/" element={<AuthPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Rutes protegides */}
        {isLoggedIn && (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/create-pet" element={<CreatePet />} />
            <Route path="/view-pets" element={<ViewPets />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App