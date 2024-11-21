// src/components/CreatePet.jsx
import React, { useState } from 'react';
import { createPet } from '../api/petsService'; // Utilitza la funció de creació de mascota
import axios from "axios";

function CreatePet({ onPetCreated }) {
  const [name, setName] = useState('');
  const [petType, setPetType] = useState('DEMENTOR'); // Default pet type
  const [colour, setColour] = useState('GREEN'); // Default colour
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(''); // Clear previous errors
  
    // Comprova que totes les dades siguin vàlides
    if (!petType || !name || !colour) {
      setErrorMessage('All fields are required');
      return;
    }
  
    try {
      // Fer la crida a l'API per crear la mascota
      const response = await axios.post(
        "http://localhost:8080/pets", // La URL de l'API per crear una mascota
        { petType, name, colour },    // Les dades de la nova mascota
        
    
      );
  
      onPetCreated(response.data);  // Passar la resposta a la funció onPetCreated per actualitzar el component
      alert('Pet created successfully'); // Missatge d'èxit
    } catch (error) {
      console.error('Error creating pet:', error);  // Mostrar l'error complet per depurar
      setErrorMessage('Failed to create pet: ' + (error.response ? error.response.data : error.message));
    }
  };
  
  

  return (
    <div>
      <h2>Create Your Pet</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Pet Type:</label>
          <select
            value={petType}
            onChange={(e) => setPetType(e.target.value)}
            required
          >
            <option value="DEMENTOR">Dementor</option>
            <option value="BASILISC">Basilisk</option>
            <option value="PHOENIX">Phoenix</option>
            <option value="THESTRAL">Thestral</option>
            <option value="OWL">Owl</option>
          </select>
        </div>
        <div>
          <label>Colour:</label>
          <select
            value={colour}
            onChange={(e) => setColour(e.target.value)}
            required
          >
            <option value="GREEN">Green</option>
            <option value="RED">Red</option>
            <option value="BLUE">Blue</option>
            <option value="YELLOW">Yellow</option>
          </select>
        </div>
        <button type="submit">Create Pet</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

export default CreatePet;
