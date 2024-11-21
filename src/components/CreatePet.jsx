// src/components/CreatePet.jsx
import React, { useState } from 'react';
import { createPet } from '../api/petsService'; // Utilitza la funció de creació de mascota

function CreatePet({ onPetCreated }) {
  const [name, setName] = useState('');
  const [petType, setPetType] = useState('DEMENTOR'); // Default pet type
  const [colour, setColour] = useState('GREEN'); // Default colour
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(''); // Clear previous errors
    try {
      const response = await createPet({ petType, name, colour }); // Crida la funció de creació de mascota
      onPetCreated(response);
      alert('Pet created successfully');
    } catch (error) {
      setErrorMessage('Failed to create pet: ' + error.message);
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
