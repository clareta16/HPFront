import React from 'react';
import './HarryPotterCharacters.css'; // Importem el CSS per estilitzar el component

const HarryPotterCharacters = () => {
  return (
    <div className="container">
      <div
        className="hp-character griffindor"
        role="img"
        aria-label="Cartoon of a Griffindor student (Harry Potter), a boy with rounded glasses and a scar in the forehead, wearing a red and gold scarf"
      ></div>
      <div
        className="hp-character slytherin"
        role="img"
        aria-label="Cartoon of a Slytherin student (Draco Malfoy), an angry-looking boy with silvery hair, wearing a green and silver scarf"
      ></div>
      <div
        className="hp-character ravenclaw"
        role="img"
        aria-label="Cartoon of a Ravenclaw student, a girl with long hair and long eye lashes, wearing a blue and bronze scarf"
      ></div>
      <div
        className="hp-character hufflepuff"
        role="img"
        aria-label="Cartoon of a Hufflepuff student, a Black boy with dark hair and eyebrows, wearing a black and yellow scarf"
      ></div>
    </div>
  );
};

export default HarryPotterCharacters;
