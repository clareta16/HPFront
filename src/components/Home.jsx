import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './Home.css';  // Assegura't d'importar el teu arxiu CSS per l'animació i el disseny

function Home() {
  const navigate = useNavigate(); // Canvia useHistory per useNavigate

  // Funció per crear una nova mascota
  const createPet = () => {
    navigate('/create-pet');  // Redirigeix a la ruta per crear una mascota
  };

  // Funció per veure les mascotes de l'usuari
  const viewPets = () => {
    navigate('/view-pets');  // Redirigeix a la ruta per veure les mascotes
  };

  return (
    <div className="home-container">
      <h1 className="welcome-title">Welcome to Hogwarts!</h1>
      <div className="buttons-container">
        <button onClick={createPet} className="action-btn">
          Create a Pet
        </button>
        <button onClick={viewPets} className="action-btn">
          View Your Pets
        </button>
      </div>
    </div>
  );
}

export default Home;

