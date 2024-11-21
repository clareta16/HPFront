import React, { useEffect, useState } from "react";
import axios from "axios";

function ViewPets() {
  const [pets, setPets] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch all pets (both user-owned and default ones)
    const fetchPets = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/pets", {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token to authenticate user
          },
        });
        setPets(response.data);  // Store pets data
      } catch (error) {
        setErrorMessage("Failed to fetch pets: " + error.message);
      }
    };

    fetchPets();
  }, []);
   // Eliminar mascota
   const deletePet = async (petId) => {
    try {
      await axios.delete(`http://localhost:8080/pets/${petId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      // Actualitzar la llista d'animals després de la seva eliminació
      setPets(pets.filter(pet => pet.id !== petId));  // Elimina la mascota de la llista
      alert("Pet deleted successfully");
    } catch (error) {
      console.error("Error deleting pet", error);
      alert("Error deleting pet");
    }
  };

  return (
    <div>
      <h2>Your Pets</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <div>
        {pets.length > 0 ? (
          pets.map((pet) => (
            <div key={pet.id} style={{ marginBottom: "20px" }}>
              <h3>{pet.name}</h3>
              <p>Type: {pet.petType}</p>
              <p>Colour: {pet.colour}</p>
              
              {/* Hunger Level */}
              <div>
                <label>Hunger Level: {pet.hungryLevel}%</label>
                <progress
                  value={pet.hungryLevel}
                  max="100"
                  style={{ width: "100%" }}
                ></progress>
              </div>
              
              {/* Sleep Level */}
              <div>
                <label>Sleep Level: {pet.sleepLevel}%</label>
                <progress
                  value={pet.sleepLevel}
                  max="100"
                  style={{ width: "100%" }}
                ></progress>
              </div>
              
              {/* Combat Level */}
              <div>
                <label>Training Level: {pet.combatLevel}%</label>
                <progress
                  value={pet.combatLevel}
                  max="100"
                  style={{ width: "100%" }}
                ></progress>
                {/* Check if the pet is ready to fight the Dark Lord */}
                {pet.combatLevel === 100 && (
                  <p style={{ color: "green", fontWeight: "bold" }}>
                    Ready to fight the Dark Lord!
                  </p>
                )}
              </div>
              
              {/* Optional: Show if the pet is ready to fight */}
              {pet.isReadyToFightDarkLord && (
                <p style={{ color: "red", fontWeight: "bold" }}>
                  This pet is ready to fight the Dark Lord!
                </p>
              )}

              {/* Delete Pet Button */}
              <button
                onClick={() => deletePet(pet.id)}
                style={{ backgroundColor: "red", color: "white", marginTop: "10px" }}
              >
                Delete Pet
              </button>
            </div>
          ))
        ) : (
          <p>No pets available.</p>
        )}
      </div>
    </div>
  );
};

export default ViewPets;
