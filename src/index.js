import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'; // Afegim el BrowserRouter

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* Envolta l'aplicació amb el Router */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Si vols començar a mesurar el rendiment a l'aplicació, passa una funció
// per enregistrar els resultats (per exemple: reportWebVitals(console.log))
// o enviar-los a un punt d'analítica. Més informació: https://bit.ly/CRA-vitals
reportWebVitals();

