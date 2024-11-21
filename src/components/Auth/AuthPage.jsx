// src/components/Auth/AuthPage.jsx
import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

function AuthPage() {
  const [showLogin, setShowLogin] = useState(true); // Controla si mostrar login o registre

  return (
    <div>
      <h2>{showLogin ? 'Login' : 'Register'}</h2>

      {/* Botons per triar entre Login i Register */}
      <div>
        <button onClick={() => setShowLogin(true)}>Login</button>
        <button onClick={() => setShowLogin(false)}>Register</button>
      </div>

      {/* Mostrar el formulari corresponent */}
      {showLogin ? <Login /> : <Register />}
    </div>
  );
}

export default AuthPage;
