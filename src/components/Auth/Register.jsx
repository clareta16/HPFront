import React, { useState } from "react";
import axios from "axios"; // Utilitza axios per fer la sol·licitud a l'API
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reseteja error anterior

    try {
      await axios.post("http://localhost:8080/auth/register", formData, {
        withCredentials: true, // Per enviar credencials si és necessari
      });

      alert("Registration successful! Please log in.");
      navigate("/login"); // Redirigeix a la pàgina de login
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Error during registration.";
      setErrorMessage(errorMsg); // Mostra l'error retornat pel servidor
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Register</button>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default Register;


