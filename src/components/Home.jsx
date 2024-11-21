// src/components/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

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
    <div>
      <h1>Welcome to Hogwarts!</h1>
      <button onClick={createPet} style={{ margin: '10px' }}>
        Create a Pet
      </button>
      <button onClick={viewPets} style={{ margin: '10px' }}>
        View Your Pets
      </button>
    </div>
  );
}

export default Home;

