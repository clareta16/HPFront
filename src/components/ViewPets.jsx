import React, { useEffect, useState } from "react";
import { getAllPets, deletePet, interactWithPet } from "../api/petsService"; // Correct path for petService
import "../styles.css";

function ViewPets() {
  const [pets, setPets] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch all pets from the backend
    const fetchPets = async () => {
      try {
        const response = await getAllPets(); // Call the service to get all pets
        setPets(
          response.data.map((pet) => ({
            ...pet,
            // Update the GIF path to include pets/ folder
            currentGif: `/assets/pets/${pet.petType.toLowerCase()}_idle.gif`, // Correct path
          }))
        );
      } catch (error) {
        setErrorMessage("Failed to fetch pets: " + error.message);
      }
    };

    fetchPets();
  }, []);

  // Function to handle pet actions
  const handlePetAction = async (petId, action) => {
    try {
      const response = await interactWithPet(petId, action); // Call the service for the action
      const updatedPet = response.data;

      // Update the pet's state with the new data and corresponding GIF
      setPets((prevPets) =>
        prevPets.map((pet) =>
          pet.id === petId
            ? {
                ...pet,
                ...updatedPet,
                // Correct path to the GIF for each action (eat, sleep, etc.)
                currentGif: `/assets/pets/${pet.petType.toLowerCase()}_${action}.gif`,
              }
            : pet
        )
      );
    } catch (error) {
      console.error(`Error performing ${action} action on pet:`, error);
      alert(`Failed to perform ${action} action.`);
    }
  };

  // Function to delete a pet
  const handleDeletePet = async (petId) => {
    try {
      await deletePet(petId); // Delete the pet via the service
      setPets((prevPets) => prevPets.filter((pet) => pet.id !== petId)); // Remove the pet from state
      alert("Pet deleted successfully.");
    } catch (error) {
      console.error("Error deleting pet:", error);
      alert("Failed to delete pet.");
    }
  };

  const getPastelColor = (color) => {
    switch (color) {
      case "RED":
        return "rgba(255, 182, 193, 0.6)"; // Light pastel red
      case "BLUE":
        return "rgba(173, 216, 230, 0.6)"; // Light pastel blue
      case "YELLOW":
        return "rgba(255, 255, 153, 0.6)"; // Light pastel yellow
      case "GREEN":
        return "rgba(144, 238, 144, 0.6)"; // Light pastel green
        default:
          return "rgba(0, 0, 0, 0.2)";
    }
  };

    const getProgressBarColor = (color) => {
      switch (color) {
        case "red":
          return "red"; // Red progress bar
        case "blue":
          return "blue"; // Blue progress bar (default)
        case "yellow":
          return "yellow"; // Yellow progress bar
        case "green":
          return "green"; // Green progress bar
        default:
          return "blue"; // Default to blue
      }
    }
  
  return (
    <div>
      <h2>Your Pets</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <div>
        {pets.length > 0 ? (
          pets.map((pet) => (
            <div className="pet-container" 
            key={pet.id}
        
              >
              <h3>{pet.name}</h3>
              <p>Type: {pet.petType}</p>
              <p>Colour: {pet.colour}</p>

              {/* Pet GIF */}
              <img
                src={pet.currentGif}
                alt={`${pet.petType} - ${pet.name}`}
                className="pet-gif"
                style={{
                  border: `8px solid ${getPastelColor(pet.colour)}`, // Apply colored border
                  borderRadius: "10px", // Optional: Rounded corners for the GIF
                }}
              />

              {/* Hunger Level */}
              <div>
                <label>Hunger Level: {pet.hungryLevel}%</label>
                <progress
                  value={pet.hungryLevel}
                  max="100"
                  style={{ 
                    width: "100%",
                    color: getProgressBarColor(pet.colour),
                   }}
                ></progress>
              </div>

              {/* Sleep Level */}
              <div>
                <label>Sleep Level: {pet.sleepLevel}%</label>
                <progress
                  value={pet.sleepLevel}
                  max="100"
                  style={{ 
                    width: "100%",
                    color: getProgressBarColor(pet.colour), }}
                ></progress>
              </div>

              {/* Combat Level */}
              <div>
                <label>Training Level: {pet.combatLevel}%</label>
                <progress
                  value={pet.combatLevel}
                  max="100"
                  style={{ 
                    width: "100%",
                    color: getProgressBarColor(pet.colour), }}
                ></progress>
                {pet.combatLevel === 100 && (
                  <p style={{ color: "green", fontWeight: "bold" }}>
                    Ready to fight the Dark Lord!
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pet-buttons">
                <button onClick={() => handlePetAction(pet.id, "eat")}>
                  Eat
                </button>
                <button onClick={() => handlePetAction(pet.id, "sleep")}>
                  Sleep
                </button>
                <button onClick={() => handlePetAction(pet.id, "fight")}>
                  Fight
                </button>
                <button
                  onClick={() => handleDeletePet(pet.id)}
                  className="delete-button"
                >
                  Delete Pet
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No pets available.</p>
        )}
      </div>
    </div>
  );
}

export default ViewPets;
